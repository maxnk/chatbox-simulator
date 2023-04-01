import {makeAutoObservable, runInAction} from 'mobx';
import {ChatboxData} from '../model/chatbox-data';
import {Chat} from '../model/chat';
import {MessageData} from '../model/message';
import {User} from '../model/user';

export class CallInfo {
    public readonly avatar: string;
    public readonly name: string;
    public readonly direction: 'incoming' | 'outgoing' = 'incoming';

    constructor(avatar: string, name: string, direction: 'incoming' | 'outgoing') {
        this.avatar = avatar;
        this.name = name;
        this.direction = direction;
    }
}

export class ChatStore {
    public chats: Chat[] = [];
    public currentUser: User | null = null;
    public activeChat: Chat | null = null;
    public messageFormText: string = '';

    public imageUrl?: string = '';
    public callInfo?: CallInfo;

    private _isScenarioRunning: boolean = false;
    private currentWritingPosition: number = 0;
    public workaround: number = 0;

    public audioPath: string = '';
    public audioPlayCounter: number = 0;

    constructor() {
        makeAutoObservable(this);
    }

    get isScenarioRunning(): boolean {
        return this._isScenarioRunning;
    }

    write(newText: string, timePerSymbol: number) {
        this.currentWritingPosition = 0;

        let _write = () => {
            if (this.currentWritingPosition > newText.length) {
                return;
            }

            runInAction(() => {
                this.messageFormText = newText.substring(0, this.currentWritingPosition);
                this.currentWritingPosition++;
            });

            setTimeout(() => _write(), timePerSymbol * Math.random());
        };

        _write();
    }

    erase(timePerSymbol: number) {
        this.currentWritingPosition = this.messageFormText.length;

        let _erase = () => {
            if (this.currentWritingPosition < 0) {
                return;
            }

            runInAction(() => {
                this.messageFormText = this.messageFormText.substring(0, this.currentWritingPosition);
                this.currentWritingPosition--;
            });

            setTimeout(() => _erase(), timePerSymbol);
        };

        _erase();
    }

    changeText(newText: string) {
        runInAction(() => this.messageFormText = newText);
    }

    changeUrl(newUrl: string | undefined) {
        runInAction(() => this.imageUrl = newUrl);
    }

    startCall(callerAvatar: string, callerName: string, direction: 'incoming' | 'outgoing') {
        runInAction(() => {
            this.callInfo = new CallInfo(callerAvatar, callerName, direction);
        });
    }

    endCall() {
        runInAction(() => {
            this.callInfo = undefined;
        });
    }

    selectChat(chatId: string) {
        runInAction(() => {
            let chat = this.chats.find(chat => chat.id === chatId);
            this.activeChat = chat || null;

            if (chat) {
                chat.messages.forEach(x => x.isRead = true);
            }
        });
    }

    addMessage(chat: Chat, message: MessageData) {
        runInAction(() => {
            this.chats.find(c => c.id === chat.id)?.messages.unshift(message);
            this.onChatsChanged();
            this.onMessagesChanged(chat);
        });
    }

    init(chatbox: ChatboxData) {
        runInAction(() => {
            this.chats = chatbox.chats;
            this.currentUser = chatbox.currentUser;
            this.activeChat = chatbox.chats[0];
            this.workaround++;
        });
    }

    toggleTyping(chat: Chat) {
        runInAction(() => {
            const existingChat = this.chats.find(c => c.id === chat.id)!;
            existingChat!.showTyping = !existingChat!.showTyping;
            this.workaround++;
        });
    }

    changeScenarioRunning(isRunning: boolean) {
        runInAction(() => {
            this._isScenarioRunning = isRunning;
        });
    }

    playAudio(path: string) {
        runInAction(() => {
            this.audioPath = path;
            this.audioPlayCounter++;
        });
    }

    addUser(chat: Chat, invitee: User) {
        runInAction(() => {
            chat.users.push(invitee);
            this.workaround++;
        });
    }

    private onChatsChanged() {
        this.chats.sort((a, b) => {
            const bMessage = b.getLastMessage();
            const aMessage = a.getLastMessage();
            if (!bMessage || !aMessage) {
                return 0;
            }

            return bMessage.dateTime.getTime() - aMessage.dateTime.getTime();
        });
        this.workaround++;
    }

    private onMessagesChanged(chat: Chat) {
        chat.messages.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());
        this.workaround++;
    }
}

export const chatStore = new ChatStore();

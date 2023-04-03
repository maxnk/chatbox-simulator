import {Action} from '../actions/actions';
import {ChatboxData} from '../../model/chatbox-data';
import TextMessageData, {CallMessageData, SystemMessageData} from '../../model/message';
import {Chat} from '../../model/chat';
import {InitAction} from '../actions/init-action';
import {IncomingMessageAction} from '../actions/incoming-message-action';
import {OutgoingMessageAction} from '../actions/outgoing-message-action';
import {ToggleTypingAction} from '../actions/toggle-typing-action';
import {WaitAction} from '../actions/wait-action';
import {SystemMessageAction} from '../actions/system-message-action';
import {WriteMessageAction} from '../actions/write-message-action';
import {User} from '../../model/user';
import {IncomingCallAction} from '../actions/incoming-call-action';
import {EraseMessageAction} from '../actions/erase-message-action';
import {SendMessageAction} from '../actions/send-message-action';
import {PlayAudioAction} from '../actions/play-audio-action';
import {AddUserAction} from '../actions/add-user-action';
import {CallMessageAction} from '../actions/call-message-action';

export class ScenarioBuilder {
    public readonly actions: Action[] = [];

    public init(chatboxData: ChatboxData): ScenarioBuilder {
        this.actions.push(new InitAction(chatboxData));

        return this;
    }

    incomingMessage(chat: Chat, message: TextMessageData): ScenarioBuilder {
        let action = new IncomingMessageAction(chat, message);
        this.actions.push(action);

        return this;
    }

    outgoingMessage(chat: Chat, message: TextMessageData): ScenarioBuilder {
        let action = new OutgoingMessageAction(chat, message);
        this.actions.push(action);

        return this;
    }

    systemMessage(chat: Chat, message: SystemMessageData): ScenarioBuilder {
        let action = new SystemMessageAction(chat, message);
        this.actions.push(action);

        return this;
    }

    toggleTyping(chat: Chat): ScenarioBuilder {
        let action = new ToggleTypingAction(chat);
        this.actions.push(action);

        return this;
    }

    writeMessage(text: string, timePerSymbol: number): ScenarioBuilder {
        let action = new WriteMessageAction(text, timePerSymbol);
        this.actions.push(action);

        return this;
    }

    eraseMessage(timePerSymbol: number): ScenarioBuilder {
        let action = new EraseMessageAction(timePerSymbol);
        this.actions.push(action);

        return this;
    }

    incomingCall(user: User): ScenarioBuilder {
        let action = new IncomingCallAction(user);
        this.actions.push(action);

        return this;
    }

    switchChat(chatId: string) {

    }

    wait(duration: number) {
        let action = new WaitAction(duration);
        this.actions.push(action);

        return this;
    }

    sendMessage(chat: Chat) {
        let action = new SendMessageAction(chat);
        this.actions.push(action);

        return this;
    }

    playAudio(path: string) {
        let action = new PlayAudioAction(path);
        this.actions.push(action);

        return this;
    }

    addUser(chat: Chat, inviter: User, invitee: User, dateTime?: Date) {
        let action = new AddUserAction(chat, inviter, invitee, dateTime);
        this.actions.push(action);

        return this;
    }

    callMessage(chat: Chat, callMessageData: CallMessageData) {
        let action = new CallMessageAction(chat, callMessageData);
        this.actions.push(action);

        return this;
    }
}

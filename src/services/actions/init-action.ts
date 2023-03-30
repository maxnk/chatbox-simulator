import {ControlledAction} from './actions';
import {ChatboxData} from '../../model/chatbox-data';
import {ChatStore} from '../../stores/chat-store';

export class InitAction extends ControlledAction {
    constructor(public chatboxData: ChatboxData, public activeChatId?: string) {
        super();

        this.activeChatId = activeChatId || chatboxData.chats[0].id;
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.init(this.chatboxData);

        step();
    }
}

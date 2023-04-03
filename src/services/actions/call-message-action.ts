import {Action} from './actions';
import {ChatStore} from '../../stores/chat-store';
import {Chat} from '../../model/chat';
import {CallMessageData} from '../../model/message';

export class CallMessageAction extends Action {
    constructor(public chat: Chat, public message: CallMessageData) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.addMessage(this.chat, this.message);

        step();
    }
}

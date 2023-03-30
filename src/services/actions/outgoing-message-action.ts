import {Chat} from '../../model/chat';
import TextMessageData from '../../model/message';
import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class OutgoingMessageAction extends ControlledAction {
    constructor(public chat: Chat, public message: TextMessageData) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.addMessage(this.chat, this.message);
        chatStore.selectChat(this.chat.id);

        step();
    }
}

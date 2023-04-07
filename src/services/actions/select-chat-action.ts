import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class SelectChatAction extends ControlledAction {
    constructor(public chat: Chat) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.selectChat(this.chat.id);

        step();
    }
}

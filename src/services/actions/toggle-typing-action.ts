import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class ToggleTypingAction extends ControlledAction {
    constructor(public chat: Chat) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.toggleTyping(this.chat);

        step();
    }
}

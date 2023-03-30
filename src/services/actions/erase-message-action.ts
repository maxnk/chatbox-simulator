import {Action} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class EraseMessageAction extends Action {
    constructor(public timePerSymbol: number) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.erase(this.timePerSymbol);

        setTimeout(
            () => step(),
            chatStore.messageFormText.length * (this.timePerSymbol)
        );
    }
}

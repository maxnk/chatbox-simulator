import {Action} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class WriteMessageAction extends Action {
    constructor(public text: string, public timePerSymbol: number) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.write(this.text, this.timePerSymbol);

        setTimeout(
            () => step(),
            this.text.length * (this.timePerSymbol / 2)
        );
    }
}

import {Action} from './actions';
import {ChatStore} from '../../stores/chat-store';

export class WaitAction extends Action {
    constructor(public duration: number) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        setTimeout(
            () => step(),
            this.duration
        );
    }
}

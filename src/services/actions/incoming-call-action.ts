import {Action} from './actions';
import {User} from '../../model/user';
import {ChatStore} from '../../stores/chat-store';

export class IncomingCallAction extends Action {
    constructor(public user: User) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.startCall(this.user.avatarUrl!, this.user.name, 'incoming');

        step();
    }
}

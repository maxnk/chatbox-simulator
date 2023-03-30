import {Action} from './actions';
import {User} from '../../model/user';

export class IncomingCallAction extends Action {
    constructor(public user: User) {
        super();
    }
}

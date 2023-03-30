import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';

export class SendMessageAction extends ControlledAction {
    constructor(public chat: Chat) {
        super();
    }
}

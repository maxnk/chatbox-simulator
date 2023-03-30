import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';

export class ToggleTypingAction extends ControlledAction {
    constructor(public chat: Chat) {
        super();
    }
}

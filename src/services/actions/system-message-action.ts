import {Chat} from '../../model/chat';
import {SystemMessageData} from '../../model/message';
import {ControlledAction} from './actions';

export class SystemMessageAction extends ControlledAction {
    constructor(public chat: Chat, public message: SystemMessageData) {
        super();
    }
}

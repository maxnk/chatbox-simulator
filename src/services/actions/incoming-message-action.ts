import {Chat} from '../../model/chat';
import TextMessageData from '../../model/message';
import {ControlledAction} from './actions';

export class IncomingMessageAction extends ControlledAction {
    constructor(public chat: Chat, public message: TextMessageData) {
        super();
    }
}

import {ControlledAction} from './actions';
import {ChatboxData} from '../../model/chatbox-data';

export class InitAction extends ControlledAction {
    constructor(public chatboxData: ChatboxData, public activeChatId?: string) {
        super();

        this.activeChatId = activeChatId || chatboxData.chats[0].id;
    }
}

import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';
import TextMessageData from '../../model/message';

export class SendMessageAction extends ControlledAction {
    constructor(public chat: Chat) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore?.addMessage(this.chat, new TextMessageData(
            'new-message',
            chatStore.messageFormText,
            new Date(),
            true,
            chatStore.currentUser!
        ));
        chatStore?.selectChat(this.chat.id);
        chatStore.changeText('');

        step();
    }
}

import {Chat} from '../../model/chat';
import {ControlledAction} from './actions';
import {ChatStore} from '../../stores/chat-store';
import {User} from '../../model/user';
import {FakeGenerator} from '../fake-generator';

export class AddUserAction extends ControlledAction {
    constructor(public chat: Chat, public inviter: User, public invitee: User, public dateTime?: Date) {
        super();
    }

    run(chatStore: ChatStore, step: () => void) {
        chatStore.addUser(this.chat, this.invitee);

        let addVerb = this.inviter.sex === 'male' ? 'добавил' : 'добавила';
        let name = this.inviter.name;

        if (this.inviter.id === chatStore.currentUser?.id) {
            addVerb = 'добавили';
            name = 'Вы';
        }

        chatStore.addMessage(
            this.chat,
            FakeGenerator.systemMessage()
                .withDateTime(this.dateTime ?? new Date())
                .withText(`${name} ${addVerb} ${this.invitee.name} в чат`)
        );


        step();
    }
}

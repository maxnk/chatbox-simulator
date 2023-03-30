import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class ForeplayScenario extends Scenario {
    public static NAME = 'Прелюдия';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('привет'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('привет'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('как дела?'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('норм, у тебя?'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('жарища седня'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('даа, сам вот думаю пораньше закончить и на пруд'))
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('я базу на проде случайно потер'));
    }
}

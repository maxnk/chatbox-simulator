import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {addMinutes, subMinutes} from 'date-fns';

export class HelloScenario extends Scenario {
    public static NAME = 'Привет';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);
        user!.name = 'Вадим Вьюшкин';
        chat!.groupTitle = 'Вадим Вьюшкин';

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(subMinutes(currentTime, 1))
                .withText('привет!'))
            .wait(3000)
            .writeMessage('привет', 100)
            .wait(500)
            .sendMessage(chat!)
            .wait(2000)
            .toggleTyping(chat!)
            .wait(10000)
            .writeMessage('пум-пурум', 100)
            .wait(10000)
            .eraseMessage(10)
            .writeMessage('очень интересно, что же там будет', 100)
            .wait(5000)
            .toggleTyping(chat!)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(addMinutes(currentTime, 1))
                .withText('как дела?'))
            .wait(500)
            .eraseMessage(10)
            .writeMessage('пип', 100);
    }
}

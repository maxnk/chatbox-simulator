import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subMinutes} from 'date-fns';

export class HelloCallScenario extends Scenario {
    public static NAME = 'Пинг';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();
        console.log(chatboxData);

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        const currentTime = new Date();

        let message = FakeGenerator.textMessage(user!)
            .withDateTime(subMinutes(currentTime, 1))
            .withText('привет, как дела?');

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, message)
            .wait(2000)
            .writeMessage("Привет, ", 200)
            .incomingCall(user!);
    }
}

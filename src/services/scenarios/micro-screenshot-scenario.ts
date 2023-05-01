import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class MicroScreenshotScenario extends Scenario {
    public static NAME = 'Скриншотик';
    public static CODENAME = 'micro-screenshot';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        let message1 = FakeGenerator.textMessage(user!);
        message1.dateTime = new Date();
        message1.text = 'Вот такая ошибка вылезла, посмотришь?';
        message1.imageUrl = process.env.PUBLIC_URL + '/assets/micro-screenshot.png';

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, message1);
    }
}

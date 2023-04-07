import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {addHours, subDays, subHours} from 'date-fns';

export class MultiHelloScenario extends Scenario {
    public static NAME = 'Мультипривет';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        const currentTime = new Date();

        let messageIn1 = FakeGenerator.textMessage(user!);
        messageIn1.dateTime = subDays(currentTime, 2);
        messageIn1.text = 'привет!';

        let messageOut1 = FakeGenerator.textMessage(chatboxData.currentUser);
        messageOut1.dateTime = addHours(subDays(currentTime, 2), 1);
        messageOut1.text = 'Привет';

        let messageIn2 = FakeGenerator.textMessage(user!);
        messageIn2.dateTime = subDays(currentTime, 1);
        messageIn2.text = 'привет!';

        let messageOut2 = FakeGenerator.textMessage(chatboxData.currentUser);
        messageOut2.dateTime = addHours(subDays(currentTime, 1), 1);
        messageOut2.text = 'Привет';

        let messageIn3 = FakeGenerator.textMessage(user!);
        messageIn3.dateTime = subHours(currentTime, 1);
        messageIn3.text = 'привет!';

        let messageOut3 = FakeGenerator.textMessage(chatboxData.currentUser);
        messageOut3.dateTime = currentTime;
        messageOut3.text = 'Привет, норм общаемся';

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, messageIn1)
            .outgoingMessage(chat!, messageOut1)
            .incomingMessage(chat!, messageIn2)
            .outgoingMessage(chat!, messageOut2)
            .incomingMessage(chat!, messageIn3)
            .outgoingMessage(chat!, messageOut3);
    }
}

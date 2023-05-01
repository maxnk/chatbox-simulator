import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subMinutes} from 'date-fns';

export class DebtCollectorScenario extends Scenario {
    public static NAME = 'Коллектор';
    public static CODENAME = 'debt-collector';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);
        user!.name = 'Леонид Лидов';

        const avatarUrl = process.env.PUBLIC_URL + '/assets/owl.png';
        chat!.avatarUrl = avatarUrl;
        user!.avatarUrl = avatarUrl;

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
            .selectChat(chat!)
            .callMessage(chat!, FakeGenerator.callMessage(user!)
                .withIsMissed(true)
                .withDateTime(subMinutes(currentTime, 30)))
            .callMessage(chat!, FakeGenerator.callMessage(user!)
                .withIsMissed(true)
                .withDateTime(subMinutes(currentTime, 25)))
            .callMessage(chat!, FakeGenerator.callMessage(user!)
                .withIsMissed(true)
                .withDateTime(subMinutes(currentTime, 15)))
            .callMessage(chat!, FakeGenerator.callMessage(user!)
                .withIsMissed(true)
                .withDateTime(subMinutes(currentTime, 10)))
            .callMessage(chat!, FakeGenerator.callMessage(user!)
                .withIsMissed(true)
                .withDateTime(subMinutes(currentTime, 5)));
    }
}

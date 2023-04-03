import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subMinutes} from 'date-fns';

export class DebtCollectorScenario extends Scenario {
    public static NAME = 'Коллектор';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);
        user!.name = 'Леонид Лидов';

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
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

import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subHours, subMinutes} from 'date-fns';

export class CoupleMinutesScenario extends Scenario {
    public static NAME = 'Пара минут';

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
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(subHours(currentTime, 2))
                .withText('привет, есть пара минут? надо <a href="#">XX-123</a> обсудить'))
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(subHours(currentTime, 2))
                .withText('привет, ага'))
            .callMessage(chat!, FakeGenerator.callMessage(user!, 5718 /* 1:35:18 */ )
                .withDateTime(subMinutes(currentTime, 30)));
    }
}

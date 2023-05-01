import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subDays, subMinutes} from 'date-fns';

export class NoReplyScenario extends Scenario {
    public static NAME = 'А я кивал';
    public static CODENAME = 'no-reply';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);
        user!.name = 'Андрей Апишкин';

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subDays(currentTime, 1))
                    .withText('Привет, тут бага приоритетная, надо поправить и захотфиксить: <a href="#">XX-123</a>')
            )
            .wait(2000)
            .systemMessage(
                chat!,
                FakeGenerator.systemMessage()
                    .withDateTime(subMinutes(currentTime, 2))
                    // .withText('прошел день...')
                    .withText('на следующий день...')
            )
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 1))
                    .withText('Андрей?')
            )
            .wait(3000)
            .toggleTyping(chat!)
            .wait(1000)
            .toggleTyping(chat!)
            .incomingMessage(
                chat!,
                FakeGenerator.textMessage(user!)
                    .withDateTime(currentTime)
                    .withText('Да, я вчера поправил, залил')
            );
    }
}

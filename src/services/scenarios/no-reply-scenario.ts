import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {addMinutes, subDays, subMinutes} from 'date-fns';

export class NoReplyScenario extends Scenario {
    public static NAME = 'А я кивал';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);
        user!.name = 'Андрей Апишкин';
        chat!.title = 'Андрей Апишкин';

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subDays(currentTime, 1))
                    .withText('Привет, тут бага приоритетная, надо поправить и захотфиксить: <a href="#">XX-123</a>')
            )
            .wait(1000)
            .systemMessage(
                chat!,
                FakeGenerator.systemMessage()
                    .withDateTime(addMinutes(subDays(currentTime, 1), 1))
                    .withText('прошел день...')
            )
            .wait(1000)
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

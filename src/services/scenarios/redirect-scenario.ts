import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subMinutes} from 'date-fns';
import {User} from '../../model/user';

const petrovich = require('petrovich');

export class RedirectScenario extends Scenario {
    public static NAME = 'Редирект';
    public static CODENAME = 'redirect';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 10))
                    .withText(`Привет, ${chatboxData.users[1].firstName}, тут у нас чебурашка в клетке как-то жалобно смотрит, наверное есть просит`)
                    .withImageUrl(process.env.PUBLIC_URL + '/assets/mogwai.jpg')
            )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[1])
                .withDateTime(subMinutes(currentTime, 9))
                .withText('Привет, чет я даже не в курсе, что у нас такое есть'))
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[1])
                .withDateTime(subMinutes(currentTime, 9))
                .withText('Попробуй спросить <b>@' + this.accusative(chatboxData.users[2]) + '</b>'))
            .wait(2000)
            .addUser(chat!, chatboxData.users[1], chatboxData.users[2], subMinutes(currentTime, 9))
            .outgoingMessage(
                    chat!,
                    FakeGenerator.textMessage(chatboxData.currentUser)
                        .withDateTime(subMinutes(currentTime, 8))
                        .withText('<b>@' + chatboxData.users[2].firstName + '</b>, привет, не поможешь с этим? (см. выше)')
                )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[3])
                .withDateTime(subMinutes(currentTime, 7))
                .withText('ыыы, лол, чебурашка ) это могвай )'))
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[3])
                .withDateTime(subMinutes(currentTime, 7))
                .withText('я чет незнай, при мне ни разу не просил, но выглядит так, как будто что-то надо'))
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[3])
                .withDateTime(subMinutes(currentTime, 7))
                .withText('может, воды?'))
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[3])
                .withDateTime(subMinutes(currentTime, 7))
                .withText('уточни у <b>' + this.genitive(chatboxData.users[4]) + '</b> - должен быть в теме'))
            .wait(2000)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 6))
                    .withText('Уфф, да, хороший пойнт про воду, спасибо')
            )
            .wait(2000)
            .addUser(chat!, chatboxData.currentUser, chatboxData.users[4], subMinutes(currentTime, 6))
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 5))
                    .withText('<b>@' + chatboxData.users[4].firstName + '</b>, привет, у нас вот такая проблема (см. выше), помоги, плиз')
            )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[4])
                .withDateTime(subMinutes(currentTime, 5))
                .withText('Привет, я уже с полгода его не видел, но он уже до меня был, им Паша Поваров занимался'))
            .wait(2000)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 4))
                    .withText('О, здорово, а не дашь его контакты?')
            )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[4])
                .withDateTime(subMinutes(currentTime, 4))
                .withText('А он уволился, но если нужно, попробую найти'))
            .wait(2000)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 3))
                    .withText('Да не, вроде не настолько критично, спасибо')
            )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[4])
                .withDateTime(subMinutes(currentTime, 3))
                .withText('Смутно припоминаю, что там что-то то ли от времени зависело, то ли от часового пояса'))
            .wait(2000)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 2))
                    .withText('Хм, интересно. Ну вроде ж ничего страшного не должно произойти, еда и вода есть, ща попробую')
            )
            .wait(2000)
            .incomingMessage(chat!, FakeGenerator.textMessage(chatboxData.users[4])
                .withDateTime(subMinutes(currentTime, 2))
                .withText('Давай, отпишись как пройдет )'))
            .wait(5000)
            .outgoingMessage(
                chat!,
                FakeGenerator.textMessage(chatboxData.currentUser)
                    .withDateTime(subMinutes(currentTime, 2))
                    .withText('ААА, ЧТО ЭТО?')
                    .withImageUrl(process.env.PUBLIC_URL + '/assets/gremlins.jpg')
            )
    }

    private getIncliner(user: User) {
        if (user.sex === 'male') {
            return petrovich.male.first;
        } else {
            return petrovich.female.first;
        }
    }

    private genitive(user: User) {
        return this.getIncliner(user).genitive(user.firstName);
    }

    private accusative(user: User) {
        return this.getIncliner(user).accusative(user.firstName);
    }
}

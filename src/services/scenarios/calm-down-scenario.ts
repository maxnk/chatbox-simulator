import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {subMinutes} from 'date-fns';

export class CalmDownScenario extends Scenario {
    public static NAME = 'Спокойствие';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        const currentTime = new Date();

        this.builder
            .init(chatboxData)
                .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                    .withDateTime(subMinutes(currentTime, 15))
                    .withText('привет, я git push --force сделал и полрепы куда-то пропало 😲'))
            .wait(3000)
                .writeMessage('Какого х', 300)
            .wait(500)
                .eraseMessage(100)
            .wait(1000)
                .writeMessage('Серьёзно??? Чему вас учат, кто тебе про force push рассказал?', 100)
            .wait(3000)
                .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                    .withDateTime(subMinutes(currentTime, 10))
                    .withText('ладно, пойду поем, пока ты пишешь'))
            .wait(2000)
                .eraseMessage(30)
            .wait(1000)
                .writeMessage('Ты, мой друг, подойди сюда, негодник, а? Что, вдруг решил ко мне обратиться? ' +
                    'Подойди, глупец, покажу тебе и всей твоей семье! Неприятный человек, неотесанный малограмотный, пренебрежитель, безобразник! ' +
                    'Подойди сюда, недобрый человек, подлец, негодник! ' +
                    'Подойди сюда, ты, неудачник, несчастный!', 50)
                // .writeMessage('О, благородный человек, приблизься ко мне, дабы обменяться словами! ' +
                //     'Скажи, внезапно решил ко мне направить свой взор? Ты, господин с избыточной гордостью, к матери твоей обращаюсь! ' +
                //     'Ну же, подойди смелее, осмелись же столкнуться со мной, а я смогу обратить тебя на путь истинный, ибо ты заблудился, увы! ' +
                //     'Прошу, приближайся, о глупец, пусть знания твои и семьи твоей пополнятся, ведь ты, мой друг, сейчас столь далек от истины и прекрасного! ' +
                //     'Взываю к тебе, обрати свой взор на меня, о заблудший, о покинутый добродетелью, ибо я вижу в тебе потенциал для перемен!', 50)
            .wait(1000)
                .eraseMessage(5)
            .wait(1000)
                .writeMessage('Уфф, это поправимо, но нам нужно будет серьёзно поговорить о культуре работы с git', 50)
            .wait(500)
                .sendMessage(chat!);
    }
}

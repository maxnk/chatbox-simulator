import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class LastQuestionScenario extends Scenario {
    public static NAME = 'Внимательность';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        this.builder
            .init(chatboxData)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText("Привет! У есть несколько вопросов по проекту: <br/ >" +
                    "1. на каком этапе мы сейчас находимся по плану? <br/ >" +
                    "2. есть ли какие-то сложности, которые могут повлиять на сроки? <br/ >" +
                    "3. будет ли полезным нам провести еще одну встречу с заказчиком на следующей неделе?"))
            .wait(3000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('Привет, да, конечно!'));
    }
}

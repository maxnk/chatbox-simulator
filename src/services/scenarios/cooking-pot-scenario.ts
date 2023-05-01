import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class CookingPotScenario extends Scenario {
    public static NAME = 'Горшочек, не вари';
    public static CODENAME = 'cooking-pot';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = chatboxData.chats.find(chat => !chat.isGroup());
        chat!.messages = [];
        let user = chat?.users.find(user => user.id !== chatboxData.currentUser.id);

        this.builder
            .init(chatboxData)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('привет!'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('как дела?'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('я тут подумал'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('вот есть же rust'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('привет'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('клевый язык'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('почему мы на нем не пишем?'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('давай проект на него переведем'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('нормально'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('отлично!'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('я уже даже начал!'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('так, стоп'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('что?'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('там на самом деле несложно'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('за пару дней справимся'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('ну может за три'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('в случае чего на выходных посижу'))
            .wait(1000)
            .incomingMessage(chat!, FakeGenerator.textMessage(user!)
                .withDateTime(new Date())
                .withText('чтоб в релиз вошло'))
            .wait(1000)
            .outgoingMessage(chat!, FakeGenerator.textMessage(chatboxData.currentUser)
                .withDateTime(new Date())
                .withText('горшочек, не вари'));
    }
}

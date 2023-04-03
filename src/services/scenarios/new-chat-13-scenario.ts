import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';

export class NewChat13Scenario extends Scenario {
    public static NAME = 'Новый чат (13)';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData({
            one2oneChatProbability: 0
        });

        const chatTitles = [
            'Новый чат (13)',
            'ошибка 400',
            'Кто-нибудь помогите',
            'рабочий',
            'Новый чат (12)',
            'Не для всех',
            'ачоваще'
        ];

        for (let i = 0; i < chatTitles.length; i++) {
            chatboxData.chats[i].groupTitle = chatTitles[i];
        }

        this.builder
            .init(chatboxData);
    }
}

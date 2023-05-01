import {FakeGenerator} from '../fake-generator';
import {Scenario} from './scenario';
import {Chat} from '../../model/chat';
import {addMinutes} from 'date-fns';

export class UdpScenario extends Scenario {
    public static NAME = 'UDP';
    public static CODENAME = 'udp';

    constructor() {
        super();

        let chatboxData = FakeGenerator.initialChatboxData();

        let chat = this.findMaxUsersChat(chatboxData.chats);
        chat!.messages = [];

        let otherUsers = chat.users.filter(user => user.id !== chatboxData.currentUser.id);

        this.builder
            .init(chatboxData)
            .selectChat(chat)
            .writeMessage('Народ, у нас пользователи жалуются, что им письма не приходят', 50)
            .wait(500)
            .sendMessage(chat)
            .wait(3000)
            .playAudio(process.env.PUBLIC_URL + '/assets/crickets.mp3')
            .wait(2000);

        for (let i = 1; i < otherUsers.length; i++) {
            this.builder
                .wait(2000 * Math.random())
                .systemMessage(
                    chat!,
                    FakeGenerator.systemMessage()
                        .withDateTime(addMinutes(new Date(), 1))
                        .withText(otherUsers[i].name + ' не в сети')
                );
        }
    }

    findMaxUsersChat(chats: Chat[]): Chat {
        let maxUsersChat = chats[0];

        for (let i = 1; i < chats.length; i++) {
            if (chats[i].users.length > maxUsersChat.users.length) {
                maxUsersChat = chats[i];
            }
        }

        return maxUsersChat;
    }
}

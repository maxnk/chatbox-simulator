import {createAvatar} from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {User} from '../model/user';
import {faker} from '@faker-js/faker';
import {Chat} from '../model/chat';
import TextMessageData, {MessageData, SystemMessageData} from '../model/message';
import {ChatboxData} from '../model/chatbox-data';

export class FakeGenerator {
    public static avatarUrl(seed?: string) {
        seed = seed || faker.datatype.string(10);

        return createAvatar(avataaars, {
            size: 128,
            seed: seed,
        }).toDataUriSync();
    }

    public static user(): User {
        let fullName = faker.name.fullName();
        return new User(
            faker.datatype.uuid(),
            fullName,
            this.avatarUrl(fullName),
            Math.random() < 0.3
        );
    }

    public static chat(users: User[], messages: MessageData[], title: string): Chat {
        return new Chat(
            faker.datatype.uuid(),
            users,
            messages,
            users.length > 2 ? 'Acme / ' + faker.company.catchPhrase() : title
        );
    }

    public static textMessage(user: User): TextMessageData {
        return new TextMessageData(
            faker.datatype.uuid(),
            faker.hacker.phrase(),
            faker.datatype.datetime({
                min: (new Date().getTime()) - 1000 * 60 * 60 * 24,
                max: new Date().getTime()
            }),
            faker.datatype.boolean(),
            user,
        );
    }

    public static systemMessage(): SystemMessageData {
        return new SystemMessageData(
            faker.datatype.uuid(),
            faker.hacker.phrase(),
            faker.datatype.datetime({
                min: (new Date().getTime()) - 1000 * 60 * 60 * 24,
                max: new Date().getTime()
            }),
            faker.datatype.boolean(),
        );
    }

    public static initialChatboxData(): ChatboxData {
        const usersCount = 10;
        const chatsCount = 10;
        const maxUsersPerChat = 10;
        const maxMessagesPerChat = 10;

        let users = [];
        for (let i = 0; i < usersCount; i++) {
            users.push(FakeGenerator.user());

        }

        let currentUser = users[0];
        let chats = [];
        for (let i = 0; i < chatsCount; i++) {
            let chatUsers = [
                currentUser
            ];

            if (Math.random() < 0.3) {
                chatUsers.push(users[1]);
            } else {
                for (let i = 0; i < Math.floor(Math.random() * maxUsersPerChat) + 1; i++) {
                    let randomUser = users[1 + Math.floor(Math.random() * (users.length - 1))];
                    chatUsers.push(randomUser);
                }
            }

            let chatMessages = [];
            for (let i = 0; i < Math.floor(Math.random() * maxMessagesPerChat) + 1; i++) {
                const messageAuthor = chatUsers[Math.floor(Math.random() * chatUsers.length)];
                const message = FakeGenerator.textMessage(messageAuthor);
                if (messageAuthor.id === currentUser.id) {
                    message.isRead = true;
                }
                chatMessages.push(message);
            }
            chatMessages.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());

            chats.push(FakeGenerator.chat(chatUsers, chatMessages, chatUsers.length > 2 ? '' : chatUsers[1].name));
        }

        chats.sort((a, b) => {
            const bMessage = b.getLastMessage();
            const aMessage = a.getLastMessage();
            if (!bMessage || !aMessage) {
                return 0;
            }

            return bMessage.dateTime.getTime() - aMessage.dateTime.getTime();
        });

        return new ChatboxData(chats, currentUser);
    }
}

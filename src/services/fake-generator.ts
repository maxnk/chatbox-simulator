import {createAvatar} from '@dicebear/core';
import {avataaars} from '@dicebear/collection';
import {User} from '../model/user';
import {faker, Sex} from '@faker-js/faker';
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
        let sex = Math.random() > 0.5 ? Sex.Male : Sex.Female;

        let fullName = faker.name.fullName({
            sex: sex
        });

        return new User(
            faker.datatype.uuid(),
            fullName,
            this.avatarUrl(fullName),
            Math.random() < 0.3,
            sex
        );
    }

    public static chat(users: User[], messages: MessageData[]): Chat {
        return new Chat(
            faker.datatype.uuid(),
            users,
            messages,
            users.length > 2 ? 'Acme / ' + faker.company.catchPhrase() : undefined
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

    public static initialChatboxData(
        {
            usersCount = 10,
            chatsCount = 9,
            maxUsersPerChat = 10,
            maxMessagesPerChat = 10,
            one2oneChatProbability = 0.3
        }: ChatboxDataGeneratorParams = {}): ChatboxData {

        if (chatsCount >= usersCount) {
            chatsCount = usersCount - 1;
        }

        if (maxUsersPerChat > usersCount) {
            maxUsersPerChat = usersCount;
        }

        let users: User[] = [];
        for (let i = 0; i < usersCount; i++) {
            users.push(FakeGenerator.user());
        }

        let currentUser = users[0];
        let chats = [];

        for (let i = 0; i < chatsCount; i++) {
            let chatUsers = [
                currentUser
            ];

            if (Math.random() < one2oneChatProbability) {
                chatUsers.push(users[i + 1]);
            } else {
                for (let j = 0; j < Math.floor(Math.random() * maxUsersPerChat) + 1; j++) {
                    let randomUser = users[j + 1];
                    chatUsers.push(randomUser);
                }
            }

            let chatMessages = [];
            for (let i = 0; i < Math.floor(Math.random() * maxMessagesPerChat); i++) {
                const messageAuthor = chatUsers[Math.floor(Math.random() * chatUsers.length)];
                const message = FakeGenerator.textMessage(messageAuthor);
                if (messageAuthor.id === currentUser.id) {
                    message.isRead = true;
                }
                chatMessages.push(message);
            }
            chatMessages.sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());

            chats.push(FakeGenerator.chat(chatUsers, chatMessages));
        }

        chats.sort((a, b) => {
            const bMessage = b.getLastMessage();
            const aMessage = a.getLastMessage();
            if (!bMessage || !aMessage) {
                return 0;
            }

            return bMessage.dateTime.getTime() - aMessage.dateTime.getTime();
        });

        return new ChatboxData(users, chats, currentUser);
    }
}

type ChatboxDataGeneratorParams = {
    usersCount?: number;
    chatsCount?: number;
    maxUsersPerChat?: number;
    maxMessagesPerChat?: number;
    one2oneChatProbability?: number;
}

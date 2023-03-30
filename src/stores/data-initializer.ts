import {chatStore} from './chat-store';
import { v4 as uuidv4 } from 'uuid';
import {subDays, subHours, subMinutes, subSeconds, subWeeks} from 'date-fns';
import {CallMessageData, DateMessageData, TextMessageData, TimeMessageData} from '../components/messages/message-data';

export class DataInitializer {
    static initialize() {
        // chatStore.messages = [
        //     {
        //         type: 'text',
        //         avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         online: true,
        //         direction: 'incoming',
        //         text: 'Hi, how are you ?'
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         text: 'What are you doing tonight ? Want to go take a drink ?',
        //         direction: 'incoming',
        //         textOnly: true
        //     } as TextMessageData,
        //     {
        //         type: 'time',
        //         dateTime: new Date(2023, 1, 1, 14, 58),
        //         direction: 'incoming'
        //     } as TimeMessageData,
        //     {
        //         type: 'text',
        //         text: 'Hey Megan ! It\'s been a while 😃',
        //         direction: 'outgoing'
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         text: 'When can we meet ?',
        //         direction: 'outgoing'
        //     } as TextMessageData,
        //     {
        //         type: 'time',
        //         dateTime: new Date(2023, 1, 1, 15, 4),
        //         direction: 'outgoing'
        //     } as TimeMessageData,
        //     {
        //         type: 'text',
        //         avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         online: true,
        //         direction: 'incoming',
        //         text: '9 pm at the bar if possible 😳'
        //     } as TextMessageData,
        //     {
        //         type: 'time',
        //         dateTime: new Date(2023, 1, 1, 15, 9),
        //         direction: 'incoming'
        //     } as TimeMessageData,
        //     {
        //         type: 'date',
        //         dateTime: new Date(2023, 1, 2),
        //     } as DateMessageData,
        //     {
        //         type: 'call',
        //         direction: 'incoming',
        //         isMissed: true,
        //         dateTime: new Date(2023, 2, 2, 15, 2)
        //     } as CallMessageData,
        //     {
        //         type: 'call',
        //         direction: 'outgoing',
        //         isMissed: true,
        //         dateTime: new Date(2023, 2, 2, 15, 2)
        //     } as CallMessageData,
        //     {
        //         type: 'call',
        //         direction: 'incoming',
        //         isMissed: true,
        //         dateTime: new Date(2023, 2, 2, 15, 2)
        //     } as CallMessageData,
        //     {
        //         type: 'call',
        //         direction: 'incoming',
        //         isMissed: false,
        //         dateTime: new Date(2023, 2, 2, 15, 2),
        //         duration: '2h 1m'
        //     } as CallMessageData,
        //     {
        //         type: 'call',
        //         direction: 'outgoing',
        //         isMissed: false,
        //         dateTime: new Date(2023, 2, 2, 15, 2),
        //         duration: '5m'
        //     } as CallMessageData,
        //     {
        //         type: 'text',
        //         avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         online: true,
        //         direction: 'incoming',
        //         text: 'Вот такая ошибка вылезла на проде, посмотришь?',
        //         imageUrl: '/assets/micro-screenshot.png'
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         online: true,
        //         direction: 'incoming',
        //         text: 'Вот такая ошибка вылезла на проде, посмотришь?',
        //         imageUrl: '/assets/mini-screenshot.png'
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         avatarUrl: '/assets/ava.png',
        //         online: true,
        //         direction: 'incoming',
        //         text: 'привет',
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         online: true,
        //         textOnly: true,
        //         direction: 'incoming',
        //         text: 'как дела',
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         online: true,
        //         textOnly: true,
        //         direction: 'incoming',
        //         text: 'нужно встретится',
        //     } as TextMessageData,
        //     {
        //         type: 'text',
        //         avatarUrl: '/assets/lexa.png',
        //         online: true,
        //         direction: 'incoming',
        //         text: 'ой, всё',
        //     } as TextMessageData,
        //     {
        //         type: 'system',
        //         text: 'Alexey вышел из чата',
        //     } as SystemMessageData,
        //     {
        //         type: 'text',
        //         online: true,
        //         direction: 'outgoing',
        //         text: 'врешь, не уйдешь 😃',
        //     } as TextMessageData,
        //     {
        //         type: 'system',
        //         text: 'Maxim добавил Alexey в чат',
        //     } as SystemMessageData,
        //     {
        //         type: 'system',
        //         text: 'Alexey вышел из чата',
        //     } as SystemMessageData,
        //     {
        //         type: 'text',
        //         online: true,
        //         direction: 'outgoing',
        //         text: 'Василий, извините, давайте продолжим собеседование позже, я сообщу Вам о дате и времени',
        //     } as TextMessageData,
        // ];
        // chatStore.chats = [
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         title: 'Megan Leib',
        //         lastMessage: '9 pm at the bar if possible 😳',
        //         timeAgo: subSeconds(new Date(), 12),
        //         online: true,
        //         active: true,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=AЧ',
        //         title: 'Acme / Чат всея проекта',
        //         lastMessage: 'Let\'s meet for a coffee or something today ?',
        //         timeAgo: subMinutes(new Date(), 2),
        //         online: true,
        //         counter: 0,
        //         isGroup: true,
        //         lastMessageAvatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        //         participantsCount: 15
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg',
        //         title: 'Dave Corlew',
        //         lastMessage: 'Let\'s meet for a coffee or something today ?',
        //         timeAgo: subMinutes(new Date(), 3),
        //         online: true,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
        //         title: 'Jerome Seiber',
        //         lastMessage: 'I\'ve sent you the annual report',
        //         timeAgo: subMinutes(new Date(), 42),
        //         online: false,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://card.thomasdaubenton.com/img/photo.jpg',
        //         title: 'Thomas Dbtn',
        //         lastMessage: 'See you tomorrow ! 🙂',
        //         timeAgo: subHours(new Date(), 2),
        //         online: true,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        //         title: 'Elsie Amador',
        //         lastMessage: 'What the f**k is going on ?',
        //         timeAgo: subDays(new Date(), 1),
        //         online: false,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80',
        //         title: 'Billy Southard',
        //         lastMessage: 'Ahahah 😂',
        //         timeAgo: subDays(new Date(), 4),
        //         online: false,
        //         counter: 0
        //     },
        //     {
        //         id: uuidv4(),
        //         avatarUrl: 'https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
        //         title: 'Paul Walker',
        //         lastMessage: 'You can\'t see me',
        //         timeAgo: subWeeks(new Date(), 1),
        //         online: false,
        //         counter: 0
        //     }
        // ];
        // chatStore.activeChat = chatStore.chats[0];
    }
}

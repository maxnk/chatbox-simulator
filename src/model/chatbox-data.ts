import {User} from './user';
import {Chat} from './chat';

export class ChatboxData {
    constructor(
        public chats: Chat[],
        public currentUser: User
    ) { }
}

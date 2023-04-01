import {User} from './user';
import {Chat} from './chat';

export class ChatboxData {
    constructor(
        public users: User[],
        public chats: Chat[],
        public currentUser: User
    ) { }
}

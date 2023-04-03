import {User} from './user';

export abstract class MessageData {
    protected constructor(
        public id: string,
        public text: string,
        public dateTime: Date,
        public isRead: boolean,
    ) {
    }

    withText(text: string) {
        this.text = text;

        return this;
    }

    withDateTime(dateTime: Date) {
        this.dateTime = dateTime;

        return this;
    }
}

export class SystemMessageData extends MessageData {
    public constructor(
        id: string,
        text: string,
        dateTime: Date,
        isRead: boolean,
    ) {
        super(id, text, dateTime, isRead);
    }
}

export abstract class UserMessageData extends MessageData {
    protected constructor(
        id: string,
        text: string,
        dateTime: Date,
        isRead: boolean,
        public user: User,
    ) {
        super(id, text, dateTime, isRead);
    }
}

export default class TextMessageData extends UserMessageData {
    constructor(
        id: string,
        text: string,
        dateTime: Date,
        isRead: boolean,
        user: User,
        public imageUrl?: string,
    ) {
        super(id, text, dateTime, isRead, user);
    }

    withImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;

        return this;
    }
}

export class CallMessageData extends UserMessageData {
    constructor(
        id: string,
        text: string,
        dateTime: Date,
        isRead: boolean,
        user: User,
        public duration: number, // in seconds
        public isMissed: boolean
    ) {
        super(id, text, dateTime, isRead, user);
    }
}

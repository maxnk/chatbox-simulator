export interface MessageData {
    type: 'text' | 'image' | 'video' | 'audio' | 'file' | 'time' | 'date' | 'call' | 'system';
    dateTime: Date;
}

export interface DateMessageData extends MessageData {
    type: 'date';
}

export interface UserMessageData extends MessageData {
    direction?: 'incoming' | 'outgoing';
}

export interface CallMessageData extends UserMessageData {
    duration?: string;
    isMissed: boolean;
    type: 'call';
}

export interface TextMessageData extends UserMessageData {
    avatarUrl?: string;
    online?: boolean;
    textOnly: boolean;
    text: string;
    type: 'text';
    imageUrl?: string;
}

export interface TimeMessageData extends UserMessageData {
    type: 'time';
}

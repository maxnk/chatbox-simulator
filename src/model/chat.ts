import {User} from './user';
import {MessageData} from './message';
import {createAvatar} from '@dicebear/core';
import {initials} from '@dicebear/collection';

export class Chat {
    constructor(
        public id: string,
        public users: User[],
        public messages: MessageData[],
        public title?: string,
        public avatarUrl?: string,
        public showTyping?: boolean,
    ) {
        this.title = this.generateTitle(title);
        this.avatarUrl = this.generateAvatarUrl(avatarUrl);
        this.showTyping = showTyping || false;
    }

    public isGroup(): boolean {
        return this.users.length > 2;
    }

    public isOnline(): boolean {
        return !this.isGroup() && this.users.some((user) => user.online);
    }

    public getLastMessage(): MessageData | null {
        return this.messages.length > 0 ? this.messages[0] : null;
    }

    public getUnreadMessagesCount(): number {
        return this.messages.filter((message) => !message.isRead).length;
    }

    private generateTitle(name?: string) {
        return name || (this.isGroup() ? '' : this.users[0].name);
    }

    private generateAvatarUrl(avatarUrl?: string) {
        return avatarUrl || (this.isGroup() ? this.getInitialsAvatarUrl(this.title!) : this.users[1].avatarUrl);
    }

    private getInitialsAvatarUrl(name: string): string {
        return createAvatar(initials, {
            size: 128,
            chars: 2,
            seed: name,
        }).toDataUriSync();
    }
}

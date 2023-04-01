import {User} from './user';
import {MessageData} from './message';
import {createAvatar} from '@dicebear/core';
import {initials} from '@dicebear/collection';

export class Chat {
    private _title?: string;
    private readonly _groupTitle?;

    constructor(
        public id: string,
        public users: User[],
        public messages: MessageData[],
        groupTitle?: string,
        public avatarUrl?: string,
        public showTyping?: boolean,
    ) {
        this._groupTitle = groupTitle;
        this.avatarUrl = this.generateAvatarUrl(avatarUrl);
        this.showTyping = showTyping || false;
    }

    get title(): string {
        return this.isGroup() ? this._groupTitle ?? this.getUsersTitle() : this.users[1].name;
    }

    private getUsersTitle() {
        const title = this.users.slice(1).map(x => x.name).join(', ');

        if (title.length > 50) {
            return title.substring(0, 50) + '...';
        }

        return title;
    }

    set title(title: string) {
        this._title = title;
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
    private generateAvatarUrl(avatarUrl?: string) {
        return avatarUrl || (this.isGroup() ? this.getInitialsAvatarUrl(this._groupTitle!) : this.users[1].avatarUrl);
    }

    private getInitialsAvatarUrl(name: string): string {
        return createAvatar(initials, {
            size: 128,
            chars: 2,
            seed: name,
        }).toDataUriSync();
    }
}

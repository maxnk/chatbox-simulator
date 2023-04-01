export class User {
    constructor(
        public id: string,
        public name: string,
        public avatarUrl?: string,
        public online: boolean = false,
        public sex: 'male' | 'female' = 'male'
        ) {
    }

    public get firstName(): string {
        return this.name.split(' ')[0];
    }
}

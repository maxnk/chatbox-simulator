export class User {
    constructor(
        public id: string,
        public name: string,
        public avatarUrl?: string,
        public online: boolean = false) {
    }
}

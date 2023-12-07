export default class User {
    public static CreateEmpty(): User {
        return new User('', '', false);
    }

    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly isActivated: boolean
    ) {}
}

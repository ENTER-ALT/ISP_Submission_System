export abstract class User {
    public readonly id?: number;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    constructor(user: { id?: number, name: string, email: string, password: string }) {
        User.validateUser(user);
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
    }

    public static validateUser(user: {name: string; email: string; password: string}) {
        if (!user.name || user.name.length=== 0){
            throw new Error("Name is required.")
        }
        if (!user.email || user.email.length=== 0){
            throw new Error("Email is required.")
        }
        if (!user.password || user.password.length=== 0){
            throw new Error("Password is required.")
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.id &&
            this.name === user.name &&
            this.email === user.email &&
            this.password === user.password
        );
    }
}
export class User {
    _id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    birth:String
}

export class Login {
    username: string;
    password: string;
}

export class UserNoPW {
    name: string;
    email: string;
    username: string;
}
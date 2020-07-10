import { User } from 'src/app/models/user';

export class Login {
  static readonly type = '[User] login';
  constructor(public payload){}
}

export class Logout {
  static readonly type = '[User] logout';
}

export class User {
  email: string;
  password: string;
  id: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.id = `${email.padEnd(5, '0').substr(0, 5)}-${new Date().getTime()}`;
  }
}

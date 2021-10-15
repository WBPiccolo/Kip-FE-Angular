export class Memo {
  title: string;
  body: string;
  id: string;

  constructor(userId: string, title: string, body: string) {
    this.id = `${userId}-${new Date().getTime()}`;
    this.title = title;
    this.body = body;
  }
}

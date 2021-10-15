import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../utilities/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Mock a fini di sviluppo
  users: User[] = [];
  //END MOCK
  //Questi metodi dovrebbero fare una semplice chiamata HTTP, per ora è tutto mockato

  constructor() {
    const defaultUser: User = new User('test@gmail.com', 'encryptMe');
    this.users.push(defaultUser);
  }

  register(email: string, password: string) {
    //TODO: encrypt password with key = email
    const encryptedPwd = 'encryptMe';
    if (!this.isUserAlreadyRegistered(email)) {
      const newUser: User = new User(email, encryptedPwd);
      this.users.push(newUser);
      console.log(newUser, 'pushato');
      return of({ status: 'OK' });
    } else {
      console.log(email, ' già presente');
      return of({ status: 'KO' });
    }
  }

  login(email: string, password: string) {
    const encryptedPwd = 'encryptMe';
    if (this.isUserAlreadyRegistered(email)) {
      const user = this.users.find((u) => {
        if (u.email === email && u.password === encryptedPwd) {
          return true;
        } else {
          return false;
        }
      });
      console.log(user);
      return of({ status: 'OK', value: user.id });
    } else {
      console.log(email, 'non trovato');
      return of({ status: 'KO', value: null });
    }
  }

  //Metodo MOCK, controllo andrebbe fatto da BE
  isUserAlreadyRegistered(email: string) {
    const emailList: string[] = this.users.map((u: User) => {
      return u.email;
    });
    console.log(this.users);
    const isEmailAlreadyRegistered: boolean = emailList.includes(email);
    return isEmailAlreadyRegistered;
  }
}

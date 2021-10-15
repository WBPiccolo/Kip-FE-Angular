import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Memo } from '../utilities/memo';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  userID: string = '';
  // MOCK
  memoLibrary: [{ userId: string; memos: Memo[] }] = [
    { userId: 'test@gmail.com', memos: [] },
  ];
  // END MOCK
  constructor() {
    //Memo mostrate di default
    this.memoLibrary[0].memos = [
      { id: this.userID, title: 'test 1', body: 'memo test 1' },
      { id: this.userID, title: 'test 2', body: 'memo test 2' },
    ];
  }

  getMemos(userID: string) {
    var memos = this.memoLibrary.filter((memo) => memo.userId === userID);
    return of({ status: 'OK', value: memos });
  }

  saveMemo(userId: string, memo: Memo) {
    const index = this.memoLibrary.findIndex((m) => m.userId === userId);
    if (index > -1) {
      this.memoLibrary[index].memos.push(memo);
    } else {
      //Non c'è l'utente, lo aggiungo
      this.memoLibrary.push({ userId: userId, memos: [memo] });
    }
  }

  editMemo(userId: string, memo: Memo) {
    const userIndex = this.memoLibrary.findIndex((m) => m.userId === userId);
    if (userIndex === -1) {
      return of({ status: 'KO', value: null });
    }
    const userMemos = this.memoLibrary[userIndex];
    const memoIndex = userMemos.memos.findIndex((m) => (m.id = memo.id));
    if (memoIndex === -1) {
      return of({ status: 'KO', value: null });
    }
    this.memoLibrary[userIndex].memos[memoIndex] = memo;
    return of({ stauts: 'OK', value: this.memoLibrary[userIndex] });
  }
}

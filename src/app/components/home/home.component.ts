import { Component, OnInit } from '@angular/core';
import { MemoService } from 'src/app/services/memo.service';
import { Memo } from 'src/app/utilities/memo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userID: string;
  memos: Memo[] = [];
  constructor(private memoService: MemoService) {}

  ngOnInit(): void {
    //this.userID = this.memoService.userID;
    this.userID = 'test@gmail.com';
    this.memoService.getMemos(this.userID).subscribe((res) => {
      this.memos = res.value[0].memos;
    });
  }
}

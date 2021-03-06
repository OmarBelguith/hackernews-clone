import { Component, OnInit, Input } from '@angular/core';
import { HackernewsApiService } from '../../services/hackernews-api.service';

import * as moment from 'moment';
@Component({
  selector: 'app-collapsible-list',
  templateUrl: './collapsible-list.component.html',
  styleUrls: ['./collapsible-list.component.scss']
})
export class CollapsibleListComponent implements OnInit {
  @Input() level: number;
  @Input() id: number;
  public by: string;
  public kids: string[];
  public text: string;
  public time: string;
  public isActivated: boolean;
  public hasCommentTree: boolean;
  constructor(private _api: HackernewsApiService) {}

  ngOnInit() {
    this.isActivated = false;
    this.hasCommentTree = false;
    this._api.getCommentTree(this.id).subscribe(
      data => {
        Object.assign(this, data);
        this.time = moment.unix(+this.time).fromNow();
        this.hasCommentTree = true;
      },
      error => console.log(error)
    );
  }

  toggleActivate() {
    this.isActivated = !this.isActivated;
  }
}

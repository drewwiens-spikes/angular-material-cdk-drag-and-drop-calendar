import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  @Input() contents: string;

  selected: boolean;

  constructor() { }

  ngOnInit() {
    this.selected = (this.contents === '');
  }

}

import { Component } from '@angular/core';
import { range, pull } from 'lodash';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  dayLabels = [ [30, 31,  1,  2,  3,  4,  5],
                [ 6,  7,  8,  9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24, 25, 26],
                [27, 28, 29, 30, 31,  1,  2] ];

  weeks = range(5); // [0...4]
  days = range(7); // [0...6]
  entryState: FormGroup[][][]; // The state of each calendar item

  constructor(private fb: FormBuilder) {
    // Start with no items in the calendar:
    this.entryState = this.dayLabels.map(week => week.map(() => []));
  }

  newEntry(day: number, week: number) {
    this.entryState[week][day].push(
      this.fb.group({
        text: [''],
        color: [''],
      })
    );
  }

  deleteEntry(day: number, week: number, control: FormControl) {
    pull(this.entryState[week][day], control);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

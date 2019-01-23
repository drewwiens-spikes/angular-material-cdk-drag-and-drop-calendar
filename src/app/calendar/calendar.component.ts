import { Component } from '@angular/core';
import { range, flatten, without, pull } from 'lodash';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  hours = range(24); // [0...23]
  days = range(7); // [0...6]

  ids: string[][]; // arr[4][10] = '4-10' (Friday 10am)
  entryState: FormGroup[][][]; // The state of each calendar item
  connections: string[][][]; // arr[day][hour] = [...ids of the other drop sites]

  constructor(private fb: FormBuilder) {
    this.initConnections();
  }

  initConnections() {
    // arr[day][hour] = '4-10' (Friday 10am):
    this.ids = this.days.map(
      day => this.hours.map(
        hour => `${day}-${hour}`
      )
    );

    // Start with no items in the calendar:
    this.entryState = this.ids.map(day => day.map(() => []));

    // arr[day][hour] --> arr[i]:
    const flatList = flatten(this.ids);

    // Connect each drop site to all the others:
    this.connections = this.ids.map(
      day => day.map(
        id => without(flatList, id)
      )
    );
  }

  newEntry(day: number, hour: number) {
    this.entryState[day][hour].push(
      this.fb.group({
        text: [''],
        color: [''],
      })
    );
  }

  deleteEntry(day: number, hour: number, control: FormControl) {
    pull(this.entryState[day][hour], control);
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

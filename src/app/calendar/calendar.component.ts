import { Component } from '@angular/core';
import { range, flatten, without } from 'lodash';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  hours = range(24); // [0...23]
  days = range(7); // [0...6]

  ids: string[][]; // arr[4][10] = '4-10' (Friday 10am)
  entries: string[][][]; // The text of each calendar item
  connections: string[][][]; // arr[day][hour] = [...ids of the other drop sites]

  constructor() {
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
    this.entries = this.ids.map(day => day.map(() => []));

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
    this.entries[day][hour].push('');
  }

}

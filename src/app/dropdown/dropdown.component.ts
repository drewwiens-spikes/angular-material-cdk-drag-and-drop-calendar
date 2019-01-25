import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @ViewChild('firstButton') firstDropdownButton: ElementRef<HTMLElement>;
  @Output() changed = new EventEmitter<string>();

  showDropdown = false;

  constructor() { }

  dropdownStyle() {
    return { open: this.showDropdown };
  }

  toggleDropdown(open: boolean, event: MouseEvent = null) {
    this.showDropdown = open;
    if (open) {
      setTimeout(() => this.firstDropdownButton.nativeElement.focus());
      event.stopPropagation();
    }
  }

}

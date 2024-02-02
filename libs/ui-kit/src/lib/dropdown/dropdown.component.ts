import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'dashboard-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input({ required: true }) options: any[] = [];
  @Input({ required: true }) selectedOption: any;
  @Output() selectedOptionChange: EventEmitter<any> = new EventEmitter<any>();

  onOptionChange(value: any) {
    this.selectedOptionChange.emit(value);
  }

  faChevronDown = faChevronDown;
}

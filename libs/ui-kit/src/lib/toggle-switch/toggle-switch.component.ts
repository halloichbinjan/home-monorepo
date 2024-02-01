import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dashboard-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent {
  @Output() toggleChanged = new EventEmitter<boolean>();

  isToggled = false;

  onToggleChange() {
    this.isToggled = !this.isToggled;
    this.toggleChanged.emit(this.isToggled);
  }
}

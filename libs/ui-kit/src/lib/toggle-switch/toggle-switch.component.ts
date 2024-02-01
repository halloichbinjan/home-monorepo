import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dashboard-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
})
export class ToggleSwitchComponent {
  @Output() toggleChanged = new EventEmitter<boolean>();

  @Input() isDeviceOn = false;

  onToggleChange() {
    this.isDeviceOn = !this.isDeviceOn;
    this.toggleChanged.emit(this.isDeviceOn);
  }
}

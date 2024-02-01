import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardComponent, ToggleSwitchComponent } from '@home-monorepo/ui-kit';

@Component({
  selector: 'dashboard-device-power-card',
  templateUrl: './device-power-card.component.html',
  styleUrls: ['./device-power-card.component.scss'],
  imports: [CommonModule, CardComponent, ToggleSwitchComponent],
  standalone: true,
})
export class DevicePowerCardComponent implements OnInit {
  @Input({ required: true }) device: any;

  cardColor = 'var(--secondary-color)';
  toggleColor = 'var(--secondary-color)';
  isDeviceOn!: boolean;

  ngOnInit(): void {
    this.device.getState().subscribe((state: any) => {
      this.isDeviceOn = state.state.on;
      this.changeColor();
    });
  }

  handleToggleChange(isToggled: boolean) {
    this.isDeviceOn = isToggled;
    this.device.toggle(isToggled);
    this.changeColor();
  }

  changeColor() {
    if (this.isDeviceOn) {
      switch (this.device.color) {
        case 'blue':
          this.cardColor =
            'linear-gradient(90deg,rgba(0, 164, 250, 1) 0%, rgba(0, 107, 242, 1) 100%)';
          this.toggleColor = 'rgba(0, 107, 242, 1)';
          break;
        case 'green':
          this.cardColor =
            'linear-gradient(90deg, rgba(51,202,186,1) 0%, rgba(43,170,93,1) 100%)';
          this.toggleColor = 'rgba(43,170,93,1)';
          break;
        case 'red':
          this.cardColor =
            'linear-gradient(90deg, rgba(250,125,116,1) 0%, rgba(249,78,57,1) 100%)';
          this.toggleColor = 'rgba(249,78,57,1)';
          break;
        case 'purple':
          this.cardColor =
            'linear-gradient(90deg, rgba(114,48,249,1) 0%, rgba(111,43,170,1) 100%)';
          this.toggleColor = 'rgba(111,43,170,1)';
          break;
        default:
          this.cardColor = 'var(--secondary-color)';
          this.toggleColor = 'var(--secondary-color)';
          break;
      }
    } else {
      this.cardColor = 'var(--secondary-color)';
      this.toggleColor = 'var(--secondary-color)';
    }
  }
}

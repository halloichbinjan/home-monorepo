import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { CardComponent, ToggleSwitchComponent } from '@home-monorepo/ui-kit';

type DeviceCardColor = 'blue' | 'green' | 'red' | 'purple' | 'grey';
@Component({
  selector: 'dashboard-device-power-card',
  standalone: true,
  imports: [CommonModule, CardComponent, ToggleSwitchComponent],
  templateUrl: './device-power-card.component.html',
  styleUrl: './device-power-card.component.scss',
})
export class DevicePowerCardComponent {
  @Input({ required: true }) device: any;

  @HostBinding('style.--card-color') cardColor!: string;

  isDeviceOn = false;

  handleToggleChange(isToggled: boolean) {
    this.isDeviceOn = isToggled;

    if (this.isDeviceOn) {
      this.changeColor(this.device.color);
      this.device.toggle(this.isDeviceOn);
    } else {
      this.changeColor('grey');
      this.device.toggle(this.isDeviceOn);
    }
  }

  changeColor(color: DeviceCardColor) {
    switch (color) {
      case 'blue':
        this.cardColor =
          'linear-gradient(90deg,rgba(0, 164, 250, 1) 0%, rgba(0, 107, 242, 1) 100%)';
        break;
      case 'green':
        this.cardColor =
          'linear-gradient(90deg, rgba(51,202,186,1) 0%, rgba(43,170,93,1) 100%)';
        break;
      case 'red':
        this.cardColor =
          'linear-gradient(90deg, rgba(250,125,116,1) 0%, rgba(249,78,57,1) 100%)';
        break;
      case 'purple':
        this.cardColor =
          'linear-gradient(90deg, rgba(114,48,249,1) 0%, rgba(111,43,170,1) 100%)';
        break;
      case 'grey':
        this.cardColor = 'var(--secondary-color)';
        break;
      default:
        this.cardColor = 'var(--secondary-color)';
        break;
    }
  }
}

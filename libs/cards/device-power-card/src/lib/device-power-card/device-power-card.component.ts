import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CardComponent } from '@home-monorepo/ui-kit';

type DeviceCardColor = 'blue' | 'green' | 'red' | 'purple';
@Component({
  selector: 'dashboard-device-power-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './device-power-card.component.html',
  styleUrl: './device-power-card.component.scss',
})
export class DevicePowerCardComponent implements OnInit {
  @Input() color?: DeviceCardColor;

  on = true;

  @HostBinding('style.--card-color') cardColor!: string;

  ngOnInit(): void {
    if (this.on) {
      switch (this.color) {
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
        default:
          this.cardColor = 'var(--secondary-color)';
          break;
      }
    }
  }
}

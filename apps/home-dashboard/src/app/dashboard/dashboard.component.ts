import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DevicePowerCardComponent } from '@home-monorepo/device-power-card';
import { DeviceService, FilterByPipe } from '@home-monorepo/shared';
import { DropdownComponent } from '@home-monorepo/ui-kit';
import { WelcomeCardComponent } from '@home-monorepo/welcome-card';

@Component({
  selector: 'dashboard-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    WelcomeCardComponent,
    DevicePowerCardComponent,
    DropdownComponent,
    FormsModule,
    FilterByPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  rooms = ['Alle', 'Wohnzimmer', 'Schlafzimmer'];
  selectedRoom = 'Wohnzimmer';

  states = ['Alle', 'On', 'Off'];
  selectedState = 'Alle';

  devices = this.deviceService.devices;

  constructor(private deviceService: DeviceService) {}

  changeSelectedRoom(room: string) {
    this.selectedRoom = room;
  }

  changeSelectedState(state: string) {
    this.selectedState = state;
  }
}

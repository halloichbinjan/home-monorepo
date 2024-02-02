import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@home-monorepo/api';
import { DevicePowerCardComponent } from '@home-monorepo/device-power-card';
import { FilterByPipe } from '@home-monorepo/shared';
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
  devices = [
    {
      name: 'Bett',
      type: 'light',
      color: 'purple',
      room: 'Schlafzimmer',
      toggle: (isToggled: boolean) => this.toggleHueDevice(1, isToggled),
      getState: () => this.getHueDeviceState(1),
    },
    {
      name: 'Schreibtisch',
      type: 'light',
      color: 'red',
      room: 'Wohnzimmer',
      toggle: (isToggled: boolean) => this.toggleHueDevice(2, isToggled),
      getState: () => this.getHueDeviceState(2),
    },
  ];

  rooms = ['Alle', 'Wohnzimmer', 'Schlafzimmer'];
  selectedRoom = 'Alle';

  constructor(private apiService: ApiService) {}

  toggleHueDevice(deviceId: number, isToggled: boolean) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}/state`;
    const body = { on: isToggled };
    this.apiService.put(path, body).subscribe({
      next: () => console.log('success'),
      error: (err) => console.log(err),
    });
  }

  getHueDeviceState(deviceId: number) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}`;

    return this.apiService.get<any>(path);
  }

  changeRoom(room: string) {
    this.selectedRoom = room;
  }
}

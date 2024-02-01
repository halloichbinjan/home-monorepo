import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '@home-monorepo/api';
import { DevicePowerCardComponent } from '@home-monorepo/device-power-card';
import { WelcomeCardComponent } from '@home-monorepo/welcome-card';

@Component({
  selector: 'dashboard-dashboard',
  standalone: true,
  imports: [CommonModule, WelcomeCardComponent, DevicePowerCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  devices = [
    {
      name: 'Bett',
      type: 'light',
      color: 'purple',
      toggle: (isToggled: boolean) => this.toggleHueDevice(1, isToggled),
      getState: () => this.getHueDeviceState(1),
    },
    {
      name: 'Schreibtisch',
      type: 'light',
      color: 'red',
      toggle: (isToggled: boolean) => this.toggleHueDevice(2, isToggled),
      getState: () => this.getHueDeviceState(2),
    },
  ];

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
}

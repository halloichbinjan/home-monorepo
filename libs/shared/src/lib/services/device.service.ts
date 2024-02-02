import { Injectable } from '@angular/core';
import { ApiService } from '@home-monorepo/api';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private apiService: ApiService) {}

  devices = [
    {
      id: 1,
      name: 'Bett',
      type: 'light',
      color: 'purple',
      room: 'Schlafzimmer',
      state: 'off',
      toggle: (isToggled: boolean) => this.toggleHueDevice(1, isToggled),
      getState: () => this.getHueDeviceState(1),
    },
    {
      id: 2,
      name: 'Schreibtisch',
      type: 'light',
      color: 'red',
      room: 'Wohnzimmer',
      state: 'off',
      toggle: (isToggled: boolean) => this.toggleHueDevice(2, isToggled),
      getState: () => this.getHueDeviceState(2),
    },
  ];

  toggleHueDevice(deviceId: number, isToggled: boolean) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}/state`;
    const body = { on: isToggled };
    this.apiService.put(path, body).subscribe({
      next: () => {
        this.devices = this.devices.map((device) => {
          if (device.id === deviceId) {
            return { ...device, state: isToggled ? 'on' : 'off' };
          }

          return device;
        });
      },
      error: (err) => console.log(err),
    });
  }

  getHueDeviceState(deviceId: number) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}`;
    return this.apiService.get<any>(path);
  }

  // checkStates() {
  //   this.checkStates$.next();
  // }
}

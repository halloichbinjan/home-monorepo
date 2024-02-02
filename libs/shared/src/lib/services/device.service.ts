import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@home-monorepo/api';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private apiService: ApiService) {}

  checkStates$ = new Subject<void>();

  devices = [
    {
      id: 1,
      name: 'Bett',
      type: 'light',
      color: 'purple',
      room: 'Schlafzimmer',
      on: false,
      toggle: (isToggled: boolean) => this.toggleHueDevice(1, isToggled),
      getState: () => this.getHueDeviceState(1),
    },
    {
      id: 2,
      name: 'Schreibtisch',
      type: 'light',
      color: 'red',
      room: 'Wohnzimmer',
      on: false,
      toggle: (isToggled: boolean) => this.toggleHueDevice(2, isToggled),
      getState: () => this.getHueDeviceState(2),
    },
  ];

  toggleHueDevice(deviceId: number, isToggled: boolean) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}/state`;
    const body = { on: isToggled };
    this.apiService.put(path, body).subscribe({
      next: () => {
        console.log('success');
        this.checkStates$.next();
      },
      error: (err) => console.log(err),
    });
  }

  getHueDeviceState(deviceId: number) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}`;
    return this.apiService.get<any>(path);
  }

  checkStates() {
    this.checkStates$.next();
  }
}

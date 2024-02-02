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
      color: 'red',
      room: 'Schlafzimmer',
      on: false,
      disabled: false,
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
      disabled: false,
      toggle: (isToggled: boolean) => this.toggleHueDevice(2, isToggled),
      getState: () => this.getHueDeviceState(2),
    },
    {
      id: 3,
      model: 'H61A0',
      deviceId: '40:DA:D4:AD:FC:00:CC:BB',
      name: 'Oben Rechts Vorne',
      type: 'led',
      color: 'green',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,

      toggle: (isToggled: boolean) =>
        this.toggleGoveeDevice('40:DA:D4:AD:FC:00:CC:BB', 'H61A0', isToggled),
      getState: () =>
        this.getGoveeDeviceState('40:DA:D4:AD:FC:00:CC:BB', 'H61A0'),
    },
    {
      id: 4,
      model: 'H61A0',
      deviceId: 'DF:A4:D4:AD:FC:01:52:B4',
      name: 'Oben Rechts Hinte',
      type: 'led',
      color: 'red',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,

      toggle: (isToggled: boolean) =>
        this.toggleGoveeDevice('DF:A4:D4:AD:FC:01:52:B4', 'H61A0', isToggled),
      getState: () =>
        this.getGoveeDeviceState('DF:A4:D4:AD:FC:01:52:B4', 'H61A0'),
    },
    {
      id: 5,
      model: 'H61A0',
      deviceId: '9F:1B:D4:AD:FC:01:CE:0A',
      name: 'Oben Links Vorne',
      type: 'led',
      color: 'blue',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,

      toggle: (isToggled: boolean) =>
        this.toggleGoveeDevice('9F:1B:D4:AD:FC:01:CE:0A', 'H61A0', isToggled),
      getState: () =>
        this.getGoveeDeviceState('9F:1B:D4:AD:FC:01:CE:0A', 'H61A0'),
    },
    {
      id: 6,
      model: 'H61A0',
      deviceId: '05:94:D4:AD:FC:01:52:B3',
      name: 'Oben Links Hinten',
      type: 'led',
      color: 'purple',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,

      toggle: (isToggled: boolean) =>
        this.toggleGoveeDevice('05:94:D4:AD:FC:01:52:B3', 'H61A0', isToggled),
      getState: () =>
        this.getGoveeDeviceState('05:94:D4:AD:FC:01:52:B3', 'H61A0'),
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

  async getHueDeviceState(deviceId: number) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}`;
    try {
      const res = await this.apiService.get<any>(path).toPromise();

      return res.state;
    } catch (err) {
      return err;
    }
  }

  toggleGoveeDevice(deviceId: string, model: string, on: boolean) {
    const path = 'https://developer-api.govee.com/v1/devices/control';
    const apiKey = '88ef979a-4e45-45ab-8a82-01ff08dca947';
    const headers = {
      'Govee-API-Key': apiKey,
    };
    const body = {
      device: deviceId,
      model: model,
      cmd: {
        name: 'turn',
        value: on ? 'on' : 'off',
      },
    };

    this.apiService.put(path, body, headers).subscribe({
      next: (res) => {
        console.log(res);

        this.checkStates$.next();
      },
      error: (err) => console.log(err),
    });
  }

  async getGoveeDeviceState(deviceId: string, model: string) {
    const path = 'https://developer-api.govee.com/v1/devices/state?';
    const apiKey = '88ef979a-4e45-45ab-8a82-01ff08dca947';
    const headers = {
      'Govee-API-Key': apiKey,
    };

    const finalPath = `${path}device=${deviceId}&model=${model}`;
    try {
      const res = await this.apiService
        .get<any>(finalPath, headers)
        .toPromise();

      const isDeviceOnline =
        res.data.properties.find((prop: any) => prop.online)?.online === 'false'
          ? false
          : true;

      console.log('isDeviceOnline', isDeviceOnline);
      if (!isDeviceOnline) {
        const device = this.devices.find(
          (device) => device.deviceId === deviceId
        );

        if (device) device.disabled = true;
        return false;
      }

      return (
        res.data.properties.find((prop: any) => prop.powerState)?.powerState ===
        'on'
      );
    } catch (err) {
      window.alert('Error getting state, probably too many requests. ');
      console.log(err);

      return false;
    }
  }

  checkStates() {
    this.checkStates$.next();
  }
}

import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { ApiService } from '@home-monorepo/api';

export interface Device {
  id: number;
  name: string;
  type: string;
  color: string;
  room: string;
  on: boolean;
  disabled: boolean;
  toggle: (isToggled: boolean, currentState: boolean) => void;
  getState: (currentState: boolean) => Promise<boolean>;
}

export interface GoveeDevice extends Device {
  deviceId: string;
  model: string;
}

@Injectable({ providedIn: 'root' })
export class DeviceService {
  constructor(private apiService: ApiService) {}

  checkStates$ = new Subject<void>();

  devices: (Device | GoveeDevice)[] = [
    {
      id: 1,
      name: 'Bett',
      type: 'light',
      color: 'red',
      room: 'Schlafzimmer',
      on: false,
      disabled: false,
      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleHueDevice(1, isToggled, currentState),
      getState: (currentState: boolean) =>
        this.getHueDeviceState(1, currentState),
    },
    {
      id: 2,
      name: 'Schreibtisch',
      type: 'light',
      color: 'red',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,
      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleHueDevice(2, isToggled, currentState),
      getState: (currentState: boolean) =>
        this.getHueDeviceState(2, currentState),
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

      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleGoveeDevice(
          '40:DA:D4:AD:FC:00:CC:BB',
          'H61A0',
          isToggled,
          currentState,
          3
        ),
      getState: (currentState: boolean) =>
        this.getGoveeDeviceState(
          '40:DA:D4:AD:FC:00:CC:BB',
          'H61A0',
          currentState,
          3
        ),
    },
    {
      id: 4,
      model: 'H61A0',
      deviceId: 'DF:A4:D4:AD:FC:01:52:B4',
      name: 'Oben Rechts Hinten',
      type: 'led',
      color: 'red',
      room: 'Wohnzimmer',
      on: false,
      disabled: false,

      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleGoveeDevice(
          'DF:A4:D4:AD:FC:01:52:B4',
          'H61A0',
          isToggled,
          currentState,
          4
        ),
      getState: (currentState: boolean) =>
        this.getGoveeDeviceState(
          'DF:A4:D4:AD:FC:01:52:B4',
          'H61A0',
          currentState,
          4
        ),
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

      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleGoveeDevice(
          '9F:1B:D4:AD:FC:01:CE:0A',
          'H61A0',
          isToggled,
          currentState,
          5
        ),
      getState: (currentState: boolean) =>
        this.getGoveeDeviceState(
          '9F:1B:D4:AD:FC:01:CE:0A',
          'H61A0',
          currentState,
          5
        ),
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

      toggle: (isToggled: boolean, currentState: boolean) =>
        this.toggleGoveeDevice(
          '05:94:D4:AD:FC:01:52:B3',
          'H61A0',
          isToggled,
          currentState,
          6
        ),
      getState: (currentState: boolean) =>
        this.getGoveeDeviceState(
          '05:94:D4:AD:FC:01:52:B3',
          'H61A0',
          currentState,
          6
        ),
    },
  ];

  toggleHueDevice(deviceId: number, isToggled: boolean, currentState: boolean) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}/state`;
    const body = { on: isToggled };
    this.apiService.put(path, body).subscribe({
      next: () => {
        this.checkStates$.next();
      },
      error: (err) => {
        this.resetDeviceState(deviceId, currentState);
        console.log(err);
      },
    });
  }

  async getHueDeviceState(deviceId: number, currentState: boolean) {
    const path = `http://192.168.178.78/api/3eeCEqkjNWQ4ZxXT3DCuk5mUplDFhXPRycKNwan5/lights/${deviceId}`;
    try {
      const res = await this.apiService.get<any>(path).toPromise();
      return res.state.on;
    } catch (err) {
      this.resetDeviceState(deviceId, currentState);
      return err;
    }
  }

  toggleGoveeDevice(
    deviceId: string,
    model: string,
    on: boolean,
    currentState: boolean,
    uniqueId: number
  ) {
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
        this.checkStates$.next();
      },
      error: (err) => {
        this.resetDeviceState(uniqueId, currentState);
        console.log(err);
      },
    });
  }

  async getGoveeDeviceState(
    deviceId: string,
    model: string,
    currentState: boolean,
    uniqueId: number
  ) {
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

      if (!isDeviceOnline) {
        const device = this.devices.find((device) => {
          if ('deviceId' in device) {
            return device.deviceId === deviceId;
          }
          return false;
        });

        if (device) device.disabled = true;
        return false;
      }

      return (
        res.data.properties.find((prop: any) => prop.powerState)?.powerState ===
        'on'
      );
    } catch (err) {
      console.log(err);
      this.resetDeviceState(uniqueId, currentState);
      return false;
    }
  }

  checkStates() {
    this.checkStates$.next();
  }

  resetDeviceState(deviceId: number | string, currentState: boolean) {
    const device = this.devices.find((device) => device.id === deviceId);
    if (device) {
      device.on = currentState;
      this.checkStates$.next();
    }
  }
}

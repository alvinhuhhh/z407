/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';
import { Commands } from './commands.data';

/**
 * Provides the low level command sending logic over Web Bluetooth API
 *
 * @author Alvin Tan
 */
@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private readonly SERVICE_UUID: string =
    '0000fdc2-0000-1000-8000-00805f9b34fb'.toLowerCase();
  private readonly COMMAND_CHARACTERISTIC: string =
    'c2e758b9-0e78-41e0-b0cb-98a593193fc5'.toLowerCase();
  private readonly RESPONSE_CHARACTERISTIC: string =
    'b84ac9c6-29c5-46d4-bba1-9d534784330f'.toLowerCase();

  private server: BluetoothRemoteGATTServer | null = null;
  private command: BluetoothRemoteGATTCharacteristic | null = null;
  private response: BluetoothRemoteGATTCharacteristic | null = null;

  private checkBluetoothSupport() {
    if (!navigator.bluetooth?.requestDevice) {
      alert(
        'Your device does not support the Web Bluetooth API. Try again on Chrome on Desktop or Android!'
      );
    }
  }

  public async connect(deviceName: string) {
    this.checkBluetoothSupport();

    if (!navigator.bluetooth) {
      throw new Error('Bluetooth is not supported on your device');
    }

    await navigator.bluetooth
      .requestDevice({
        filters: [{ name: deviceName }],
        optionalServices: [this.SERVICE_UUID],
      })
      .then((device: BluetoothDevice) => this.pair(device))
      .then((server: BluetoothRemoteGATTServer) =>
        this.getPrimaryService(server)
      )
      .then((service: BluetoothRemoteGATTService) =>
        this.getCharacteristics(service)
      )
      .then((characteristic: BluetoothRemoteGATTCharacteristic) =>
        this.getNotifications(characteristic)
      )
      .then(() => this.handshake());
  }

  public disconnect() {
    this.checkBluetoothSupport();

    if (!this.server) {
      throw new Error('No GATT server connected');
    }

    this.server.disconnect();
    console.debug('Successfully disconnected');
  }

  private onDisconnect() {
    this.response?.stopNotifications();
    this.server = null;
    this.command = null;
    this.response = null;
    console.debug('All variables cleaned up');
  }

  private async pair(
    device: BluetoothDevice
  ): Promise<BluetoothRemoteGATTServer> {
    console.debug(`Successfully paired with ${device.name}`);

    device.addEventListener('gattserverdisconnected', this.onDisconnect);

    if (!device.gatt) {
      throw new Error(`No GATT server found on device ${device.name}`);
    }

    console.debug(`Connecting to GATT server on ${device.name}`);
    return device.gatt.connect();
  }

  private async getPrimaryService(
    server: BluetoothRemoteGATTServer
  ): Promise<BluetoothRemoteGATTService> {
    console.debug(
      `Successfully connected to GATT server on ${server.device.name}`
    );

    this.server = server;
    console.debug(`Getting primary GATT service on ${server.device.name}`);
    return server.getPrimaryService(this.SERVICE_UUID);
  }

  private async getCharacteristics(
    service: BluetoothRemoteGATTService
  ): Promise<BluetoothRemoteGATTCharacteristic> {
    console.debug(
      `Succesfully found primary GATT Service UUID: ${service.uuid}`
    );

    this.command = await service.getCharacteristic(this.COMMAND_CHARACTERISTIC);
    console.debug(
      `Found command characteristic UUID: ${this.COMMAND_CHARACTERISTIC}`
    );

    this.response = await service.getCharacteristic(
      this.RESPONSE_CHARACTERISTIC
    );
    console.debug(
      `Found response characteristic UUID: ${this.RESPONSE_CHARACTERISTIC}`
    );

    if (!this.command || !this.response) {
      throw new Error(
        'Unable to find either COMMAND or RESPONSE characteristic'
      );
    }

    return this.response;
  }

  private async getNotifications(
    characteristic: BluetoothRemoteGATTCharacteristic
  ): Promise<void> {
    if (!characteristic?.properties?.notify) {
      throw new Error('Invalid response characteristic');
    }

    await characteristic.startNotifications();
  }

  private async handshake() {
    if (!this.command) {
      throw new Error('Command characteristic not found');
    }

    await this.command.writeValueWithoutResponse(
      new Uint8Array(Commands.INITIATE)
    );
    await this.command.writeValueWithoutResponse(
      new Uint8Array(Commands.ACKNOWLEDGE)
    );

    console.debug('Handshake completed successfully');
  }

  public async write(command: number[], verify: number[]) {
    if (!this.command) {
      throw new Error('Command characteristic not found');
    }

    console.debug(`Writing ${command} to command characteristic`);
    const buf = new Uint8Array(command);
    await this.command.writeValueWithoutResponse(buf);

    if (!(await this.verify(verify))) {
      this.write(command, verify);
    }
  }

  private async verify(hex: number[]) {
    const data = await this.response?.readValue();

    if (!data) {
      throw new Error('Data received is undefined');
    }

    const buffer = new Uint8Array(
      data.buffer,
      data.byteOffset,
      data.byteLength
    );
    console.debug(buffer);

    return (
      buffer.byteLength === hex.length &&
      buffer.every((value, index) => value === hex[index])
    );
  }

  constructor() {}
}

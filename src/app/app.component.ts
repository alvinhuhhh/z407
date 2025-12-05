/// <reference types="web-bluetooth" />

import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Z407Service } from './services/z407.service';
import { ControlButtonComponent } from './components/control-button/control-button.component';

@Component({
  selector: 'app-root',
  imports: [ControlButtonComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public connected: 'connected' | 'disconnected' = 'disconnected';
  public mode: 'bluetooth' | 'aux' | 'usb' | undefined = undefined;

  public async onConnectClick() {
    this.z407.connect().then(() => {
      this.connected = 'connected';
    });
  }

  public async onDisconnectClick() {
    this.z407.disconnect();
    this.connected = 'disconnected';
    this.mode = undefined;
  }

  public async onPlayPauseClick() {
    this.z407.playPause();
  }

  public async onVolumeUpClick() {
    this.z407.volumeUp();
  }

  public async onVolumeDownClick() {
    this.z407.volumeDown();
  }

  public async onBluetoothClick() {
    this.z407.switchBluetooth().then(() => {
      this.mode = 'bluetooth';
    });
  }

  public async onAuxClick() {
    this.z407.switchAux().then(() => {
      this.mode = 'aux';
    });
  }

  public async onUsbClick() {
    this.z407.switchUsb().then(() => {
      this.mode = 'usb';
    });
  }

  public async onPairingModeClick() {
    this.z407.enterPairingMode();
  }

  constructor(private readonly z407: Z407Service) {}

  ngOnInit(): void {
    initFlowbite();
  }
}

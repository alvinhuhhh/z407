import { Injectable } from '@angular/core';
import { ConnectionService } from '../core/connection.service';
import { Commands } from '../core/commands.data';
import { Responses } from '../core/responses.data';

/**
 * Provides abstracted service methods for the basic core functionalities of the Z407
 *
 * @author Alvin Tan
 */
@Injectable({
  providedIn: 'root',
})
export class Z407Service {
  public async connect() {
    await this.connection.connect('ZS283A_develop_ot');
  }

  public disconnect() {
    this.connection.disconnect();
  }

  public async volumeUp() {
    await this.connection.writeWithoutVerify(Commands.VOLUME_UP);
  }

  public async volumeDown() {
    await this.connection.writeWithoutVerify(Commands.VOLUME_DOWN);
  }

  public async bassUp() {
    await this.connection.write(Commands.BASS_UP, Responses.BASS_UP);
  }

  public async bassDown() {
    await this.connection.write(Commands.BASS_DOWN, Responses.BASS_DOWN);
  }

  public async playPause() {
    await this.connection.writeWithoutVerify(Commands.PLAY_PAUSE);
  }

  public async nextTrack() {
    await this.connection.write(Commands.NEXT_TRACK, Responses.NEXT_TRACK);
  }

  public async prevTrack() {
    await this.connection.write(Commands.PREV_TRACK, Responses.PREV_TRACK);
  }

  public async switchBluetooth() {
    await this.connection.write(
      Commands.SWITCH_BLUETOOTH,
      Responses.SWITCH_BLUETOOTH
    );
  }

  public async switchAux() {
    await this.connection.write(Commands.SWITCH_AUX, Responses.SWITCH_AUX);
  }

  public async switchUsb() {
    await this.connection.write(Commands.SWITCH_USB, Responses.SWITCH_USB);
  }

  public async enterPairingMode() {
    await this.connection.write(
      Commands.BT_PAIRING_MODE,
      Responses.BT_PAIRING_MODE
    );
  }

  public async factoryReset() {
    await this.connection.write(
      Commands.FACTORY_RESET,
      Responses.FACTORY_RESET
    );
  }

  constructor(private connection: ConnectionService) {}
}

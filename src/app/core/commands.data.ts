/**
 * Hex code commands to send to the Command characteristic
 *
 * @author Alvin Tan
 */
export class Commands {
  static readonly INITIATE = [0x84, 0x05];
  static readonly ACKNOWLEDGE = [0x84, 0x00];

  static readonly VOLUME_UP = [0x80, 0x02];
  static readonly VOLUME_DOWN = [0x80, 0x03];
  static readonly BASS_UP = [0x80, 0x00];
  static readonly BASS_DOWN = [0x80, 0x01];

  static readonly PLAY_PAUSE = [0x80, 0x04];
  static readonly NEXT_TRACK = [0x80, 0x05];
  static readonly PREV_TRACK = [0x80, 0x06];

  static readonly SWITCH_BLUETOOTH = [0x81, 0x01];
  static readonly SWITCH_AUX = [0x81, 0x02];
  static readonly SWITCH_USB = [0x81, 0x03];

  static readonly BT_PAIRING_MODE = [0x82, 0x00];
  static readonly FACTORY_RESET = [0x83, 0x00];
}

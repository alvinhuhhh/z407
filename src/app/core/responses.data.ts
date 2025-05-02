/**
 * Hex code responses from the Response characteristic notifications
 *
 * @author Alvin Tan
 */
export class Responses {
  static readonly INITIATE = [0xd4, 0x00, 0x00];
  static readonly ACKNOWLEDGE = [0xd4, 0x00, 0x01];

  static readonly VOLUME_UP = [0xc0, 0x02];
  static readonly VOLUME_DOWN = [0xc0, 0x03];
  static readonly PLAY_PAUSE = [0xc0, 0x04];

  static readonly SWITCH_BLUETOOTH = [0xc1, 0x01];
  static readonly SWITCH_AUX = [0xc1, 0x02];
  static readonly SWITCH_USB = [0xc1, 0x03];

  static readonly FACTORY_RESET = [0xc3, 0x00];
  static readonly BASS_CONTROL = [0xc5, 0x02];
}

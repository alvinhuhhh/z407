import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from './icon/icon.component';
import { Icon, IconSize } from './icon/icon.model';

@Component({
  selector: 'app-control-button',
  imports: [IconComponent],
  templateUrl: './control-button.component.html',
})
export class ControlButtonComponent {
  @Input()
  public text!: string;

  @Input()
  public icon!: Icon;

  @Input()
  public iconSize!: IconSize;

  @Output()
  public click = new EventEmitter();
}

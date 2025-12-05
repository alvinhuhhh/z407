import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Icon, IconSize, IconProperties } from './icon.model';

@Component({
  selector: 'app-icon',
  imports: [NgClass],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input()
  public icon!: Icon;

  @Input()
  public size!: IconSize;

  public propertiesMap: { [key: string]: IconProperties } = {
    s: {
      class: 'size-8',
    },
    m: {
      class: 'size-12',
    },
    l: {
      class: 'size-24',
    },
    xl: {
      class: 'size-32',
    },
  };
}

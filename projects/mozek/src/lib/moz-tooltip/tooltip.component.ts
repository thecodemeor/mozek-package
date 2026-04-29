import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'moz-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="moz-tooltip-popup" 
      [class.moz-tooltip--visible]="visible"
      [ngClass]="'moz-tooltip-popup--' + position"
      [style.left.px]="left"
      [style.top.px]="top"
      role="tooltip"
    >
      {{ text }}
      <div class="moz-tooltip-popup__arrow"></div>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class MozTooltipComponent {
  @Input() text: string = '';
  @Input() position: 'top' | 'bottom' = 'top';
  @Input() left: number = 0;
  @Input() top: number = 0;
  @Input() visible: boolean = false;
}

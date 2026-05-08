import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

export type MozMenuPositionX = 'before' | 'after';
export type MozMenuPositionY = 'above' | 'below';

@Component({
  selector: 'moz-menu',
  exportAs: 'mozMenu',
  standalone: true,
  template: `
    <ng-template>
      <div class="moz-menu-popup" (click)="close($event)">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MozMenu {
  @Input() xPosition: MozMenuPositionX = 'after';
  @Input() yPosition: MozMenuPositionY = 'below';
  
  @Output() closed = new EventEmitter<void>();

  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;

  close(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const item = target.closest('.moz-menu-item');
    if (item && !item.hasAttribute('disabled') && !item.classList.contains('disabled')) {
      this.closed.emit();
    }
  }
}

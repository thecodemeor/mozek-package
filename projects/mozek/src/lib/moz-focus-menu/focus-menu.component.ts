import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'moz-focus-menu',
  standalone: true,
  exportAs: 'mozFocusMenu',
  template: `
    <ng-template>
      <div class="moz-focus-menu-content">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozFocusMenu {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
}

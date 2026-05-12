import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'moz-tutor',
  standalone: true,
  exportAs: 'mozTutor',
  template: `
    <ng-template>
      <div class="moz-tutor-content">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozTutor {
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;
}

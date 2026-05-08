import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  inject,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  TemplateRef
} from '@angular/core';
import { MozButton } from '../moz-button/button';

@Component({
  selector: 'moz-tutor',
  standalone: true,
  exportAs: 'mozTutor',
  template: `<ng-template><ng-content></ng-content></ng-template>`,
  styleUrls: ['./tutor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozTutorComponent {
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<any>;
}

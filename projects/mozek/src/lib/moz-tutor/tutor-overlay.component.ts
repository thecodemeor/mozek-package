import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  TemplateRef,
  HostListener,
  signal,
  Output,
  EventEmitter
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'moz-tutor-overlay',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div 
      class="moz-tutor-backdrop" 
      [class.visible]="visible()" 
      (click)="onBackdropClick($event)">
    </div>
    
    <div 
      #panel 
      class="moz-tutor-panel" 
      [class.visible]="visible()"
      [class]="positionClass()"
      [style.left.px]="left"
      [style.top.px]="top">
      <div class="focus-content">
        <ng-template [ngTemplateOutlet]="templateRef"></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./tutor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozTutorOverlay implements AfterViewInit {
  templateRef!: TemplateRef<unknown>;
  triggerElement!: HTMLElement;
  
  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') panel!: ElementRef<HTMLElement>;

  visible = signal(false);
  positionClass = signal<'drop-down' | 'drop-up'>('drop-down');
  
  left = 0;
  top = 0;

  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  ngAfterViewInit(): void {
    this.updatePosition();
    
    // Animate in
    requestAnimationFrame(() => {
      this.visible.set(true);
      this.cdr.detectChanges();
    });
  }

  updatePosition(): void {
    if (!this.triggerElement) return;

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Default left alignment
    this.left = triggerRect.left;

    // Determine if it should drop up or down
    // We assume a default menu height of ~200px if not yet measured
    const estimatedHeight = 250; 
    const spaceBelow = windowHeight - triggerRect.bottom;

    if (spaceBelow < estimatedHeight && triggerRect.top > estimatedHeight) {
      this.positionClass.set('drop-up');
      this.top = triggerRect.top - estimatedHeight; 
    } else {
      this.positionClass.set('drop-down');
      this.top = triggerRect.bottom + 8;
    }
    
    // Correcting top for drop-up using measured height if possible
    setTimeout(() => {
      if (this.panel) {
        const panelRect = this.panel.nativeElement.getBoundingClientRect();
        if (this.positionClass() === 'drop-up') {
          this.top = triggerRect.top - panelRect.height - 8;
          this.cdr.detectChanges();
        }
      }
    }, 0);
  }

  onBackdropClick(event: MouseEvent): void {
    this.close();
  }

  close(): void {
    this.visible.set(false);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.closed.emit();
    }, 250);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updatePosition();
    this.cdr.detectChanges();
  }
}

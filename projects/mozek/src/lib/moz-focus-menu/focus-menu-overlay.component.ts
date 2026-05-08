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
  TemplateRef,
  HostListener,
  signal,
  Output,
  EventEmitter
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'moz-focus-menu-overlay',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div 
      class="moz-focus-menu-backdrop" 
      [class.visible]="visible()" 
      (click)="onBackdropClick($event)">
    </div>
    
    <div 
      #panel 
      class="moz-focus-menu-panel" 
      [class.visible]="visible()"
      [class]="positionClass()"
      [style.left.px]="left"
      [style.top.px]="top">
      <div class="focus-content">
        <ng-template [ngTemplateOutlet]="templateRef"></ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./focus-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozFocusMenuOverlayComponent implements AfterViewInit {
  templateRef!: TemplateRef<any>;
  triggerElement!: HTMLElement;
  
  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') panel!: ElementRef<HTMLElement>;

  visible = signal(false);
  positionClass = signal<'drop-down' | 'drop-up'>('drop-down');
  
  left = 0;
  top = 0;

  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);

  ngAfterViewInit() {
    this.updatePosition();
    
    // Animate in
    requestAnimationFrame(() => {
      this.visible.set(true);
      this.cdr.detectChanges();
    });
  }

  updatePosition() {
    if (!this.triggerElement) return;

    const triggerRect = this.triggerElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Default left alignment
    this.left = triggerRect.left;

    // Determine if it should drop up or down
    // We assume a default menu height of ~200px if not yet measured
    const estimatedHeight = 250; 
    const spaceBelow = windowHeight - triggerRect.bottom;

    if (spaceBelow < estimatedHeight && triggerRect.top > estimatedHeight) {
      this.positionClass.set('drop-up');
      this.top = triggerRect.top - 8; // Small gap, we use transform-origin bottom
      // In the CSS we use transform-origin: bottom center and top-origin: top center
      // But we need to position the box top correctly.
      // Actually, it's easier to position it and let CSS handle the origin.
      this.top = triggerRect.top - estimatedHeight; // Simplified for now, will refine in real-time if needed
      // Better approach: set top to triggerRect.top and use transform: translateY(-100%) in CSS if drop-up
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

  onBackdropClick(event: MouseEvent) {
    this.close();
  }

  close() {
    this.visible.set(false);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.closed.emit();
    }, 250);
  }

  @HostListener('window:resize')
  onResize() {
    this.updatePosition();
    this.cdr.detectChanges();
  }
}

import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  createComponent,
  NgZone
} from '@angular/core';
import { MozTooltip } from './tooltip.component';

/**
 * MozTooltip — adds a tooltip to any element.
 *
 * Usage:
 *   <button mozTooltip="Save changes">Save</button>
 *   <button mozTooltip="Delete" mozTooltipPosition="bottom">Delete</button>
 *   <button mozTooltip="Slow tip" [mozTooltipDelay]="600">Hover</button>
 */
@Directive({
  selector: '[mozTooltip]',
  standalone: true,
})
export class MozTooltipDirective implements OnInit, OnDestroy {
  /** The tooltip text to display on hover */
  @Input('mozTooltip') text: string = '';

  /** Where the tooltip appears relative to the host. Default is 'auto'. */
  @Input() mozTooltipPosition: 'top' | 'bottom' | 'auto' = 'auto';

  /** Delay in ms before the tooltip appears. Default 120ms. */
  @Input() mozTooltipDelay: number = 120;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly zone = inject(NgZone);

  private componentRef: ComponentRef<MozTooltip> | null = null;
  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    const host = this.el.nativeElement;
    if (!host.hasAttribute('tabindex') && host.tagName !== 'BUTTON' && host.tagName !== 'A') {
      host.setAttribute('aria-label', this.text);
    }
  }

  @HostListener('mouseenter')
  @HostListener('focus')
  onShow() {
    if (!this.text?.trim()) return;
    this.clearTimers();
    this.showTimer = setTimeout(() => this.create(), this.mozTooltipDelay);
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  onHide() {
    this.clearTimers();
    if (this.componentRef) {
      this.componentRef.instance.visible = false;
      this.hideTimer = setTimeout(() => this.destroy(), 200);
    }
  }

  private create() {
    if (this.componentRef) return;

    // Create the component
    this.componentRef = createComponent(MozTooltip, {
      environmentInjector: this.injector
    });

    // Initialize properties
    this.componentRef.instance.text = this.text;
    
    // Attach to app so it's part of change detection
    this.appRef.attachView(this.componentRef.hostView);

    // Append to body
    document.body.appendChild(this.componentRef.location.nativeElement);

    // Initial change detection to render text and get measurements
    this.componentRef.changeDetectorRef.detectChanges();

    // Initial position update
    this.updatePosition();

    // Trigger visibility on next tick for animation
    requestAnimationFrame(() => {
      if (this.componentRef) {
        this.componentRef.instance.visible = true;
        this.componentRef.changeDetectorRef.detectChanges();
      }
    });

    // Listen for resize and scroll to update position
    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onScrollResize, { passive: true });
      window.addEventListener('scroll', this.onScrollResize, { passive: true, capture: true });
    });
  }

  private onScrollResize = () => {
    if (this.componentRef) {
      this.updatePosition();
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  private updatePosition() {
    if (!this.componentRef) return;
    const host = this.el.nativeElement.getBoundingClientRect();
    const instance = this.componentRef.instance;

    // Resolve position
    let pos: 'top' | 'bottom';
    if (this.mozTooltipPosition !== 'auto') {
      pos = this.mozTooltipPosition;
    } else {
      pos = host.top > 80 ? 'top' : 'bottom';
    }

    instance.position = pos;

    // Measure tooltip size
    const tipEl = this.componentRef.location.nativeElement.querySelector('.moz-tooltip-popup') as HTMLElement;
    if (!tipEl) return;

    const tipW = tipEl.offsetWidth;
    const tipH = tipEl.offsetHeight;

    // Center horizontally on host; clamp to viewport edges
    let left = host.left + host.width / 2 - tipW / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tipW - 8));

    let top: number;
    if (pos === 'top') {
      top = host.top - tipH - 10;
    } else {
      top = host.bottom + 10;
    }

    // Calculate arrow position relative to tooltip popup
    // Host center in viewport
    const hostCenterX = host.left + host.width / 2;
    // Arrow's left relative to the tooltip popup
    let arrowLeft = hostCenterX - left;
    
    // Clamp arrow to tooltip edges with some padding for rounded corners
    const arrowPadding = 12;
    arrowLeft = Math.max(arrowPadding, Math.min(arrowLeft, tipW - arrowPadding));

    instance.left = left;
    instance.top = top;
    instance.arrowLeft = arrowLeft;
    
    // Update view with new coordinates
    this.componentRef.changeDetectorRef.detectChanges();
  }

  private destroy() {
    if (this.componentRef) {
      window.removeEventListener('resize', this.onScrollResize);
      window.removeEventListener('scroll', this.onScrollResize, { capture: true });
      
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private clearTimers() {
    if (this.showTimer !== null) { clearTimeout(this.showTimer); this.showTimer = null; }
    if (this.hideTimer !== null) { clearTimeout(this.hideTimer); this.hideTimer = null; }
  }

  ngOnDestroy() {
    this.clearTimers();
    this.destroy();
  }
}

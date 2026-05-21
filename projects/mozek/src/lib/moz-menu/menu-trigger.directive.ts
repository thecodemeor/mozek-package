import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  ApplicationRef,
  NgZone,
  ViewContainerRef,
  EmbeddedViewRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MozMenu } from './menu.component';

@Directive({
  selector: '[mozMenuTriggerFor]',
  standalone: true,
})
export class MozMenuTrigger implements OnDestroy {
  @Input('mozMenuTriggerFor') menu!: MozMenu;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly appRef = inject(ApplicationRef);
  private readonly zone = inject(NgZone);
  private readonly vcr = inject(ViewContainerRef);

  private viewRef: EmbeddedViewRef<unknown> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private panelEl: HTMLElement | null = null;
  private closedSubscription: Subscription | null = null;

  @HostListener('click', ['$event'])
  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    if (this.viewRef) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.viewRef || !this.panelEl) return;
    
    const clickedInside = this.panelEl.contains(event.target as Node);
    const clickedTrigger = this.el.nativeElement.contains(event.target as Node);
    
    if (!clickedInside && !clickedTrigger) {
      this.closeMenu();
    }
  }

  openMenu(): void {
    if (this.viewRef || !this.menu || !this.menu.templateRef) return;

    this.viewRef = this.vcr.createEmbeddedView(this.menu.templateRef);
    
    // Grab the root node of the embedded view which is the .moz-menu-popup
    this.panelEl = this.viewRef.rootNodes[0] as HTMLElement;

    this.closedSubscription = this.menu.closed.subscribe(() => {
      this.closeMenu();
    });

    document.body.appendChild(this.panelEl);
    this.viewRef.detectChanges();
    this.updatePosition();

    requestAnimationFrame(() => {
      if (this.panelEl) {
        this.panelEl.classList.add('moz-menu--visible');
      }
    });

    this.zone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onScrollResize, { passive: true });
      window.addEventListener('scroll', this.onScrollResize, { passive: true, capture: true });
    });
  }

  closeMenu(): void {
    if (this.hideTimer) return;
    if (this.panelEl) {
      this.panelEl.classList.remove('moz-menu--visible');
      
      this.hideTimer = setTimeout(() => {
        this.destroy();
        this.hideTimer = null;
      }, 150);
    }
  }

  private onScrollResize = () => {
    if (this.panelEl) {
      this.updatePosition();
    }
  }

  private updatePosition() {
    if (!this.panelEl) return;
    const host = this.el.nativeElement.getBoundingClientRect();
    
    const panelW = this.panelEl.offsetWidth;
    const panelH = this.panelEl.offsetHeight;

    let top = 0;
    let left = 0;

    // yPosition: 'above' | 'below'
    if (this.menu.yPosition === 'above') {
      top = host.top - panelH - 8;
    } else {
      top = host.bottom + 8;
    }

    // xPosition: 'before' | 'after'
    if (this.menu.xPosition === 'before') {
      left = host.right - panelW;
    } else {
      left = host.left;
    }

    // Keep in viewport horizontally
    left = Math.max(8, Math.min(left, window.innerWidth - panelW - 8));
    
    // Auto flip top/bottom if it goes out of screen
    let isTop = false;
    if (this.menu.yPosition === 'below' && top + panelH > window.innerHeight && host.top - panelH - 8 > 0) {
        top = host.top - panelH - 8;
        this.panelEl.style.transformOrigin = 'bottom left';
        isTop = true;
    } else if (this.menu.yPosition === 'above' && top < 0 && host.bottom + panelH + 8 < window.innerHeight) {
        top = host.bottom + 8;
        this.panelEl.style.transformOrigin = 'top left';
        isTop = false;
    } else {
        isTop = this.menu.yPosition === 'above';
        this.panelEl.style.transformOrigin = isTop ? 'bottom left' : 'top left';
    }

    const spaceBelow = window.innerHeight - host.bottom - 8 - 12;
    const spaceAbove = host.top - 8 - 12;
    const availableSpace = isTop ? spaceAbove : spaceBelow;

    this.panelEl.style.left = `${left}px`;
    if (isTop) {
        this.panelEl.style.top = '';
        this.panelEl.style.bottom = `${window.innerHeight - host.top + 8}px`;
    } else {
        this.panelEl.style.top = `${host.bottom + 8}px`;
        this.panelEl.style.bottom = '';
    }
    
    this.panelEl.style.minWidth = `${host.width}px`;
    this.panelEl.style.maxHeight = `${Math.max(160, Math.floor(availableSpace))}px`;
    this.panelEl.style.overflowY = 'auto';
  }

  private destroy(): void {
    if (this.viewRef) {
      window.removeEventListener('resize', this.onScrollResize);
      window.removeEventListener('scroll', this.onScrollResize, { capture: true });
      
      if (this.closedSubscription) {
        this.closedSubscription.unsubscribe();
        this.closedSubscription = null;
      }

      if (this.panelEl && this.panelEl.parentNode) {
        this.panelEl.parentNode.removeChild(this.panelEl);
      }
      
      this.viewRef.destroy();
      this.viewRef = null;
      this.panelEl = null;
    }
  }

  ngOnDestroy(): void {
    if (this.hideTimer !== null) clearTimeout(this.hideTimer);
    this.destroy();
  }
}

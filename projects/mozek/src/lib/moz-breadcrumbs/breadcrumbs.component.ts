import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  inject,
  ViewChild,
  NgZone,
  input,
  signal,
  computed,
  effect
} from '@angular/core';
import { MozIcon } from '../moz-icon/icon';
import { MozMenu, MozMenuTrigger, MozMenuItem } from '../moz-menu/menu';
import { MozBreadcrumbItem } from './breadcrumbs.types';

@Component({
  selector: 'moz-breadcrumbs',
  standalone: true,
  imports: [MozIcon, MozMenu, MozMenuTrigger, MozMenuItem],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozBreadcrumbs implements AfterViewInit, OnDestroy {
  // Signal Input for breadcrumb data
  items = input<MozBreadcrumbItem[]>([]);
  
  @ViewChild('measureContainer') measureContainer!: ElementRef<HTMLElement>;
  
  // State Signals
  collapsed = signal(false);
  
  // Computed views
  firstItem = computed(() => {
    const list = this.items();
    return list.length > 0 ? list[0] : null;
  });

  lastItem = computed(() => {
    const list = this.items();
    return list.length > 1 ? list[list.length - 1] : null;
  });

  middleItems = computed(() => {
    const list = this.items();
    return list.length > 2 ? list.slice(1, -1) : [];
  });

  private el = inject(ElementRef<HTMLElement>);
  private zone = inject(NgZone);
  private resizeObserver!: ResizeObserver;

  constructor() {
    // Re-check overflow if items change
    effect(() => {
      this.items();
      this.zone.runOutsideAngular(() => {
        setTimeout(() => this.checkOverflow(), 0);
      });
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => {
        this.checkOverflow();
      });
      this.resizeObserver.observe(this.el.nativeElement);
      if (this.measureContainer) {
        this.resizeObserver.observe(this.measureContainer.nativeElement);
      }
    });
    
    // Initial check
    setTimeout(() => this.checkOverflow(), 0);
  }

  private checkOverflow() {
    if (!this.measureContainer || !this.el) return;
    
    const availableWidth = this.el.nativeElement.offsetWidth;
    const requiredWidth = this.measureContainer.nativeElement.offsetWidth;
    
    // Switch to collapsed if required width is larger than available width and we have at least 3 items
    const shouldCollapse = requiredWidth > availableWidth && this.items().length >= 3;
    
    if (this.collapsed() !== shouldCollapse) {
      this.zone.run(() => {
        this.collapsed.set(shouldCollapse);
      });
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}

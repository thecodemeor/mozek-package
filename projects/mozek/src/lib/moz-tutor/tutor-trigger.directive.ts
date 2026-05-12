import {
  Directive,
  Input,
  ElementRef,
  inject,
  ApplicationRef,
  EnvironmentInjector,
  createComponent,
  ComponentRef,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal
} from '@angular/core';
import { MozTutor } from './tutor.component';
import { MozTutorOverlay } from './tutor-overlay.component';

@Directive({
  selector: '[mozTutorFor]',
  standalone: true,
  exportAs: 'mozTutorTrigger'
})
export class MozTutorTrigger implements OnInit, OnDestroy, AfterViewInit {
  @Input('mozTutorFor') tutor!: MozTutor;

  private elementRef = inject(ElementRef);
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private renderer = inject(Renderer2);

  private overlayRef: ComponentRef<MozTutorOverlay> | null = null;
  
  // Use Angular Signal for isOpen state
  isOpen = signal(false);

  ngOnInit() {
    // Initial setup if needed
  }

  ngAfterViewInit() {
    // Automatically open on init as requested
    // Small delay to ensure everything is rendered and positioned
    setTimeout(() => {
      this.open();
    }, 1000);
  }

  open() {
    if (this.isOpen()) return;

    // 1. Elevate the trigger element above the blur
    this.renderer.addClass(this.elementRef.nativeElement, 'moz-tutor-trigger-highlight');
    
    // 2. Lock body scroll
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.renderer.setStyle(document.body, 'padding-right', this.getScrollbarWidth() + 'px');

    // 3. Create and attach overlay
    this.overlayRef = createComponent(MozTutorOverlay, {
      environmentInjector: this.injector
    });

    this.overlayRef.instance.triggerElement = this.elementRef.nativeElement;
    this.overlayRef.instance.templateRef = this.tutor.templateRef;
    
    // Listen for close event
    this.overlayRef.instance.closed.subscribe(() => {
      this.close();
    });

    this.appRef.attachView(this.overlayRef.hostView);
    document.body.appendChild(this.overlayRef.location.nativeElement);
    
    this.isOpen.set(true);
  }

  close() {
    if (!this.isOpen()) return;

    // 1. Remove elevation class
    this.renderer.removeClass(this.elementRef.nativeElement, 'moz-tutor-trigger-highlight');

    // 2. Unlock body scroll
    this.renderer.removeStyle(document.body, 'overflow');
    this.renderer.removeStyle(document.body, 'padding-right');

    // 3. Destroy overlay
    if (this.overlayRef) {
      this.appRef.detachView(this.overlayRef.hostView);
      this.overlayRef.destroy();
      this.overlayRef = null;
    }

    this.isOpen.set(false);
  }

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  ngOnDestroy() {
    this.close();
  }
}

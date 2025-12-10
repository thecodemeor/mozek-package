// ============================================================================
// monzar Button Styles
// ============================================================================
// Defines base and variant styles for the Button component in the
// monzar Design System. Buttons are key interactive elements that
// trigger actions and guide user flow.
//
// Customizable Props:
// - color, model, full (width), disabled
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------

import {
    Component,
    ChangeDetectionStrategy,
    Input,
    HostBinding,
    HostListener,
    ElementRef,
    Renderer2,
    inject,
    booleanAttribute
} from '@angular/core';

@Component({
  selector: 'mon-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonButton {
    @Input() model: 'fill' | 'outline' | 'tonal' | 'elevated' | 'flavor' | 'glass' | 'text' = 'fill';
    @Input() color: 'default' | 'primary' | 'secondary' | 'success' | 'warn' | 'danger' | string = 'default';
    @Input({ transform: booleanAttribute }) full = false;
    @Input({ transform: booleanAttribute }) disabled = false;

    private el = inject(ElementRef<HTMLElement>);
    private renderer = inject(Renderer2);

    get hostClasses(): string {
        return [
            'mon-btn', `mon-btn--${this.model}`,
        ].filter(Boolean).join(' ');
    }

    get btnColor(): string {
        if (typeof this.color === 'string' && /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(this.color)) {
            return this.color;
        }

        switch (this.color) {
            case 'primary': return 'var(--mon-color-primary)';
            case 'success': return 'var(--mon-color-success)';
            case 'warn':    return 'var(--mon-color-warning)';
            case 'danger':  return 'var(--mon-color-danger)';
            default:
                if(
                    this.model === 'outline' ||
                    this.model === 'elevated' ||
                    this.model === 'glass' ||
                    this.model === 'flavor' || 
                    this.model === 'tonal'
                ) {
                    return 'var(--mon-color-text)';
                } else {
                    return 'var(--mon-color-primary)';
                }
        }
    }

    get btnLineContrast(): string {
        if(this.model === 'flavor') {
            if(this.color === 'default') {
                return '5%'
            } else {
                return '10%'
            }
        } else {
            if(this.color === 'default') {
                return '10%'
            } else {
                return '20%'
            }
        }
    }

    @HostBinding('style.width') get hostWidth() {
        return this.full ? '100%' : null;
    }


    // Ripple effect ============================================================= //
    @HostListener('click', ['$event'])
    onClick(e: MouseEvent) {
        if (this.disabled) { e.preventDefault(); e.stopImmediatePropagation(); return; }
        this.spawnRipple(e);
    }
    private spawnRipple(event: MouseEvent) {
        const button = this.el.nativeElement.querySelector('.buttonRipple') as HTMLElement;
        if (!button) return;

        // remove old ripples
        button.querySelectorAll('.ripple').forEach(r => this.renderer.removeChild(button, r));

        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const w = button.offsetWidth;
        const h = button.offsetHeight;

        const maxDim = Math.max(
            Math.hypot(x, y),
            Math.hypot(w - x, y),
            Math.hypot(x, h - y),
            Math.hypot(w - x, h - y)
        );
        const size = maxDim * 2;

        const ripple = this.renderer.createElement('span');
        this.renderer.addClass(ripple, 'ripple');
        this.renderer.setStyle(ripple, 'width', `${size}px`);
        this.renderer.setStyle(ripple, 'height', `${size}px`);
        this.renderer.setStyle(ripple, 'top', `${y - size / 2}px`);
        this.renderer.setStyle(ripple, 'left', `${x - size / 2}px`);
        this.renderer.setStyle(ripple, 'background', this.btnColor);
        this.renderer.appendChild(button, ripple);

        const off = this.renderer.listen(ripple, 'animationend', () => {
            off();
            this.renderer.removeChild(button, ripple);
        });
    }
}
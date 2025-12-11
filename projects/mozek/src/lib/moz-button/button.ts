// ============================================================================
// Mozek Button Component
// ============================================================================
// Defines base and variant styles for the Button component in the
// Mozek Design System. Buttons are key interactive elements that
// trigger actions and guide user flow.
//
// Customizable Inputs:
// - color: semantic or custom hex color
// - model: visual variant
// - full : full-width button
// - disabled: interaction lock
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
    booleanAttribute,
} from '@angular/core';
import { MozColorName, isHexColor } from '../resource/export';

type MozButtonModel =
    | 'fill'
    | 'outline'
    | 'tonal'
    | 'elevated'
    | 'flavor'
    | 'glass'
    | 'text';

@Component({
    selector: 'moz-button',
    templateUrl: './button.html',
    styleUrls: ['./button.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MozButton {
    @Input() model: MozButtonModel = 'fill';
    @Input() color: MozColorName | string = 'default';

    @Input({ transform: booleanAttribute }) full = false;
    @Input({ transform: booleanAttribute }) disabled = false;

    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    // ---------------------------------------------------------------------------
    // Host bindings
    // ---------------------------------------------------------------------------
    @HostBinding('class')
    get hostClasses(): string {
        return ['moz-btn', `moz-btn--${this.model}`].join(' ');
    }

    @HostBinding('style.width')
    get hostWidth(): string {
        return this.full ? '100%' : 'fit-content';
    }

    @HostBinding('attr.aria-disabled')
    get ariaDisabled(): 'true' | null {
        return this.disabled ? 'true' : null;
    }

    @HostBinding('style.--moz-btn-color')
    get hostBtnColorVar(): string {
        return this.btnColor;
    }

    @HostBinding('style.--moz-btn-line-contrast')
    get hostBtnLineContrastVar(): string {
        return this.btnLineContrast;
    }

    // ---------------------------------------------------------------------------
    // Computed properties
    // ---------------------------------------------------------------------------
    get btnColor(): string {
        // Allow custom hex colors like #fff or #ff00aa
        if (isHexColor(this.color)) {
            return this.color as string;
        }

        switch (this.color) {
            case 'primary':
                return 'var(--moz-color-primary)';
            case 'secondary':
                return 'var(--moz-color-secondary)';
            case 'success':
                return 'var(--moz-color-success)';
            case 'warn':
                return 'var(--moz-color-warning)';
            case 'danger':
                return 'var(--moz-color-danger)';
            default:
                // 'default' semantic logic based on model
                if (
                    this.model === 'outline' ||
                    this.model === 'elevated' ||
                    this.model === 'glass' ||
                    this.model === 'flavor' ||
                    this.model === 'tonal'
                ) {
                    return 'var(--moz-color-text)';
                } else {
                    return 'var(--moz-color-primary)';
                }
        }
    }

    get btnLineContrast(): string {
        const isDefault = this.color === 'default';

        if (this.model === 'flavor') {
            return isDefault ? '5%' : '10%';
        } else {
        return isDefault ? '10%' : '20%';
        }
    }

    // ---------------------------------------------------------------------------
    // Ripple effect
    // ---------------------------------------------------------------------------

    @HostListener('click', ['$event'])
    onClick(e: MouseEvent): void {
        if (this.disabled) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }
        this.spawnRipple(e);
    }

    private spawnRipple(event: MouseEvent): void {
        const button = this.el.nativeElement.querySelector('.buttonRipple') as HTMLElement | null;
        if (!button) return;

        // remove old ripples
        button
        .querySelectorAll('.ripple')
        .forEach((r) => this.renderer.removeChild(button, r));

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

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    
}
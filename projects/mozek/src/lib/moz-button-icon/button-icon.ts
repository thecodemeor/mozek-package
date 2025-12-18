// ============================================================================
// Mozek Button Styles
// ============================================================================
// Defines base and variant styles for the Button component in the
// Mozek Design System. Buttons are key interactive elements that
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
    booleanAttribute
} from '@angular/core';
import { MozColorName } from '../helper/export';

type MozButtonIconModel = 'tonal' | 'glass' | 'text';

@Component({
  selector: 'moz-button-icon',
  templateUrl: './button-icon.html',
  styleUrls: ['./button-icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozButtonIcon {
    @Input() model: MozButtonIconModel = 'text';
    @Input() color: MozColorName = 'default';
    @Input({ transform: booleanAttribute }) gap = false;
    @Input({ transform: booleanAttribute }) disabled = false;

    @HostBinding('attr.aria-disabled')
    get ariaDisabled(): 'true' | null {
        return this.disabled ? 'true' : null;
    }

    get hostClasses(): string {
        return [
            'moz-btnIcon', `moz-btnIcon--${this.model}`, `${this.disabled ? 'disabled' : ''}`
        ].filter(Boolean).join(' ');
    }

    get btnColor(): string {
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn':    return 'var(--moz-color-warning)';
            case 'danger':  return 'var(--moz-color-danger)';
            default:        return 'var(--moz-color-text)';
        }
    }

    get btnPadding() {
        return this.gap ? '0.4rem' : '0.2rem';
    }
}
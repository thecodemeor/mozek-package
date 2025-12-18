// ============================================================================
// Mozek Divider Styles
// ============================================================================
// Defines base and variant styles for the Divider component in the
// Mozek Design System. Dividers visually separate content sections
// to improve layout structure and readability.
//
// Customizable Props:
// - color, orientation, align, dashed, pill, depth
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------


import {
    Component,
    Input,
    ChangeDetectionStrategy,
    booleanAttribute
} from '@angular/core';
import { MozColorName } from '../helper/export';

type MozAlign =
    | 'start'
    | 'center'
    | 'end'

type MozDepth =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'

type MozOrientation =
    | 'horizontal'
    | 'vertical'

@Component({
    selector: 'moz-divider',
    templateUrl: './divider.html',
    styleUrls: ['./divider.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozDivider {
    @Input() align: MozAlign = 'center';
    @Input() color: MozColorName = 'default';
    @Input() depth: MozDepth = '1';
    @Input() orientation: MozOrientation = 'horizontal';
    @Input({ transform: booleanAttribute }) dashed = false;
    @Input({ transform: booleanAttribute }) pill = false;
    
    get hostClasses(): string[] {
        return [
        'moz-divider',
        `moz-divider--align-${this.align}`,
        `moz-divider--${this.orientation}`,
        this.dashed ? 'moz-divider--dashed' : '',
        this.pill ? 'moz-divider--pill' : ''
        ].filter(Boolean);
    }

    /** Compute inline style for color */
    get styleVars() {
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn':    return 'var(--moz-color-warning)';
            case 'danger':  return 'var(--moz-color-danger)';
            default: return ;
        }
    }

    get styleDepth() {
        return `0.${this.depth}rem`
    }
}
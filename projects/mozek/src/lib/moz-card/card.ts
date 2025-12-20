// ============================================================================
// Mozek Card Styles
// ============================================================================
// Defines base and variant styles for the Card component in the
// mozek Design System. Cards serve as flexible containers for
// grouping related content, media, and actions.
//
// Customizable Props:
// - model, color, advance, loading
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------


import {
    Component,
    ChangeDetectionStrategy,
    Input,
    booleanAttribute,
    HostBinding,
    Directive
} from '@angular/core';
import { MozColorName, isHexColor } from '../helper/export';

type MozCardModel =
    | 'fill'
    | 'outline'
    | 'elevated'
    | 'flavor'
    | 'glass'

@Component({
    selector: 'moz-card',
    templateUrl: './card.html',
    styleUrls: ['./card.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozCard {
    @Input() model: MozCardModel = 'fill';
    @Input() color: MozColorName | string = 'default';
    @Input({ transform: booleanAttribute }) advance = false;
    @Input({ transform: booleanAttribute }) loading = false;

    @HostBinding('class') get hostClass() {
        const loading = this.loading ? 'moz-card-skeleton' : '';
        const advancing = this.advance ? 'moz-card-advancing' : '';

        return `moz-card-${this.model} ${loading} ${advancing}`.trim();
    }

    @HostBinding('style.--moz-card-bg') get hostColor() {
        if (isHexColor(this.color)) {
            return this.color as string;
        }
        
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn':    return 'var(--moz-color-warning)';
            case 'danger':  return 'var(--moz-color-danger)';
            default:
                if (this.model === 'fill') {
                    return 'var(--moz-color-primary)'
                } else {
                    return 'var(--moz-color-surface)';
                }
        }
    }

    @HostBinding('style.--moz-card-bg-contrast') get hostBgContrast() {
        if(this.model === 'flavor') {
            if(this.color === 'default') {
                return '0%'
            } else {
                return '10%'
            }
        } else { return }
    }

    @HostBinding('style.padding') get hostAdvance() {
        return this.advance ? 'var(--moz-space-1)' : ''
    }

    get headerClasses(): string {
        return [
            this.model === 'fill' && this.advance ? 'moz-card-header--fill' : '',
            this.model === 'flavor' && this.advance ? 'moz-card-header--flavor' : '',
        ].filter(Boolean).join(' ');
    }

    get bodyClasses(): string {
        return [
            this.model === 'fill' && this.advance ? 'moz-card-body--fill' : '',
            this.model === 'flavor' && !this.advance ? 'moz-card-body--flavor' : '',
        ].filter(Boolean).join(' ');
    }

    get footerClasses(): string {
        return [
            this.model === 'fill' && this.advance ? 'moz-card-footer--fill' : '',
        ].filter(Boolean).join(' ');
    }
}

@Directive({ selector: 'moz-card-header', standalone: true })
export class MozCardHeader {}

@Directive({ selector: 'moz-card-body', standalone: true })
export class MozCardBody{}

@Directive({ selector: 'moz-card-footer', standalone: true })
export class MozCardFooter {}

@Directive({ selector: 'moz-card-media', standalone: true })
export class MozCardMedia {}

@Directive({ selector: 'moz-card-header-actions', standalone: true })
export class MozCardHeaderActions {}

@Directive({ selector: 'moz-card-footer-actions', standalone: true })
export class MozCardFooterActions {}
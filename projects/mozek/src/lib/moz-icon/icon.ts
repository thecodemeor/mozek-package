// ============================================================================
// Mozek Icon Styles
// ============================================================================
// Defines size, color, and alignment styles for the Icon component in the
// Mozek Design System. Icons enhance visual communication and support
// clarity in buttons, labels, and status indicators.
//
// Customizable Props:
// - name, size, color
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------

import {
    Component,
    Input,
    AfterContentInit,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { mozek_OUTLINE_ICONS, mozek_DUOTONE_ICONS } from './mozek-icons';
import { MozColorName, isHexColor } from '../helper/export';

type MozIconModel = 'outline' | 'duotone';

@Component({
    selector: 'moz-icon',
    templateUrl: './icon.html',
    styleUrls: ['./icon.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozIcon implements AfterContentInit {
    @Input() model: MozIconModel = 'outline';
    @Input() color: MozColorName | string = 'default';
    @Input() size: string | number = 24;

    @ViewChild('slot', { static: true }) slot!: ElementRef<HTMLElement>;

    iconName = '';
    safeSvg?: SafeHtml;


    private sanitizer = inject(DomSanitizer);
    private cdr = inject(ChangeDetectorRef);

    ngAfterContentInit(): void {
        this.iconName = (this.slot.nativeElement.textContent ?? '').trim();

        let svg = '';
        if (this.model === 'duotone') {
            svg = mozek_DUOTONE_ICONS[this.iconName] || '';
        } else {
            svg = mozek_OUTLINE_ICONS[this.iconName] || '';
        }
        this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

        this.cdr.markForCheck();
    }

    get colorVar(): string {
        if (isHexColor(this.color)) {
            return this.color as string;
        }

        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn': return 'var(--moz-color-warning)';
            case 'danger': return 'var(--moz-color-danger)';
            default: return 'var(--moz-color-text)'; // "default"
        }
    }

    get iconSize(): string { return `${this.size}px`;}
}
// ============================================================================
// Mozek Radio Styles
// ============================================================================
// Defines base and variant styles for the Radio component in the
// Mozek Design System. Radios allow users to select a single option
// from a predefined set of choices.
//
// Customizable Props:
// - color, labelPosition, name, disabled, checked, value
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------


import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
    booleanAttribute,
    HostBinding,
    ChangeDetectorRef,
    inject,
    ElementRef,
    ViewChild
} from '@angular/core';
import { MozColorName } from '../helper/export';

@Component({
    selector: 'moz-radio',
    templateUrl: './radio.html',
    styleUrls: ['./radio.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozRadio {
    @Input() color: MozColorName = 'default';
    @Input() position: 'end' | 'start' = 'end';
    @Input() name?: string;
    @Input() value: any;
    @Input({ transform: booleanAttribute }) tabStop = false;

    private _checked = false;
    private _disabled = false;

    @Input({ transform: booleanAttribute })
    get checked(): boolean {
        return this._checked;
    }
    set checked(value: boolean) {
        const next = !!value;
        if (this._checked === next) return;
        this._checked = next;
        this._cdr.markForCheck();
    }

    @Input({ transform: booleanAttribute })
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        const next = !!value;
        if (this._disabled === next) return;
        this._disabled = next;
        this._cdr.markForCheck();
    }

    @Output() change = new EventEmitter<any>();

    @HostBinding('class.moz-radio--disabled')
    get isDisabled() { return this.disabled; }

    @HostBinding('attr.role') role = 'radio';

    @HostBinding('attr.aria-checked')
    get ariaChecked() { return String(this.checked); }

    @HostBinding('attr.aria-disabled')
    get ariaDisabled() { return String(this.disabled); }

    @HostBinding('tabindex')
    get tabIndex() { return (this.disabled || !this.tabStop) ? -1 : 0; }

    @ViewChild('input', { static: true })

    private _input!: ElementRef<HTMLInputElement>;
    private _cdr = inject(ChangeDetectorRef);

    onInputChange() {
        if (this.disabled) return;
        // if (!this.checked) {
        //     this.checked = true;
        //     this.change.emit(this.value);
        // }
        this.change.emit(this.value);
    }

    onKeydown(e: KeyboardEvent) {
        if (this.disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.onInputChange();
        }
    }

    get hostClasses(): string {
        return [
            'moz-radio',
            this.position === 'start' ? 'moz-radio--start' : '',
            this.disabled ? 'moz-radio--disabled' : ''
        ].filter(Boolean).join(' ');
    }

    get colorVar(): string {
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn':    return 'var(--moz-color-warning)';
            case 'danger':  return 'var(--moz-color-danger)';
            default:        return 'var(--moz-color-text)';
        }
    }

    focus() {
        if (!this.disabled) {
            this._input.nativeElement.focus();
        }
    }
}
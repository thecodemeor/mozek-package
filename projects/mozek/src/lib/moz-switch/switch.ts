// ============================================================================
// Mozek Switch Styles
// ============================================================================
// Defines base, state, and variant styles for the Switch component in the
// Mozek Design System. Switch provides a compact toggle control for turning
// options on or off, with clear states, smooth transitions, and accessible
// focus indicators.
//
// Customizable Props:
// - color, size, checked, disabled, label, helper, loading, full (width),
//   icon, subtle (style), elevation
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
    forwardRef,
    HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MozColorName } from '../helper/export';

@Component({
    selector: 'moz-switch',
    standalone: true,
    imports: [],
    templateUrl: './switch.html',
    styleUrls: ['./switch.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MozSwitch),
        multi: true
    }]
})
export class MozSwitch implements ControlValueAccessor {
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input() color: MozColorName = 'primary';

    @Output() changed = new EventEmitter<boolean>();

    private _value = false;
    onChange: (v: boolean) => void = () => {};
    onTouched: () => void = () => {};

    get checked(): boolean { return this._value; }
    set checked(v: boolean) {
        this._value = !!v;
        this.onChange(this._value);
    }

    toggle(): void {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.changed.emit(this.checked);
    }

    // ControlValueAccessor
    writeValue(v: boolean): void { this._value = !!v; }
    registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    // For host
    @HostBinding('class.disabled') get hostDisabled(): boolean { return this.disabled; }
    @HostBinding('attr.role') role = 'switch';
    @HostBinding('attr.aria-checked') get ariaChecked(): boolean { return this.checked; }
    @HostBinding('attr.aria-disabled') get ariaDisabled(): boolean { return this.disabled; }
}
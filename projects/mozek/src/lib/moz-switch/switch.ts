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
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MozColorName } from '../helper/export';

@Component({
    selector: 'moz-switch',
    standalone: true,
    imports: [CommonModule],
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

    get checked() { return this._value; }
    set checked(v: boolean) {
        this._value = !!v;
        this.onChange(this._value);
    }

    toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.changed.emit(this.checked);
    }

    // ControlValueAccessor
    writeValue(v: any): void { this._value = !!v; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    // For host
    @HostBinding('class.disabled') get hostDisabled() { return this.disabled; }
    @HostBinding('attr.role') role = 'switch';
    @HostBinding('attr.aria-checked') get ariaChecked() { return this.checked; }
    @HostBinding('attr.aria-disabled') get ariaDisabled() { return this.disabled; }
}
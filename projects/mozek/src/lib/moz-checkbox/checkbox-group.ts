// ============================================================================
// Mozek Checkbox Group Styles
// ============================================================================
// Defines layout and interaction styles for grouping multiple
// Checkbox components within the Mozek Design System. The group
// enables users to select multiple related options in a unified form.
//
// Customizable Props:
// - orientation, disabled, trackBy, 
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------

// ============================================================================
// Mozek Checkbox Group
// ============================================================================


import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    booleanAttribute,
    forwardRef,
    ChangeDetectorRef,
    OnDestroy,
    inject
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MozCheckbox } from './checkbox';
import { Subscription } from 'rxjs';

@Component({
    selector: 'moz-checkbox-group',
    templateUrl: './checkbox-group.html',
    styleUrls: ['./checkbox-group.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MozCheckboxGroup),
        multi: true
    }]
})
export class MozCheckboxGroup implements AfterContentInit, ControlValueAccessor, OnDestroy {

    @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
    @Input() trackBy?: (value: any) => any;

    private _disabled = false;
    @Input({ transform: booleanAttribute })
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        const next = !!value;
        if (this._disabled === next) return;
        this._disabled = next;

        this._syncDisabled();
        this._cdr.markForCheck();
    }

    @Output() valueChange = new EventEmitter<any[]>();

    @ContentChildren(MozCheckbox, { descendants: true }) boxes!: QueryList<MozCheckbox>;

    private _value: any[] = [];
    private _subs: Subscription[] = [];

    // CVA hooks
    onChange: (v: any[]) => void = () => {};
    onTouched: () => void = () => {};

    private _cdr = inject(ChangeDetectorRef);

    get value(): any[] {
        return this._value;
    }
    set value(v: any[]) {
        this._value = Array.isArray(v) ? v.slice() : [];
        this._syncFromValue();
        this.onChange(this._value);
        this.valueChange.emit(this._value);
    }

    // ControlValueAccessor
    writeValue(v: any[]): void {
        this.value = Array.isArray(v) ? v : [];
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // Reuse the @Input() setter logic
        this.disabled = isDisabled;
    }

    // Lifecycle
    ngAfterContentInit(): void {
        this._wire();
        this._syncFromValue();
        this._syncDisabled();

        // React to dynamic additions/removals
        this.boxes.changes.subscribe(() => {
        this._wire();
        this._syncFromValue();
        this._syncDisabled();
        this._cdr.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._clearSubscriptions();
    }

    // Internal wiring
    private _wire() {
        this._clearSubscriptions();

        this.boxes.forEach(cb => {
            const sub = cb.change.subscribe((checked: boolean) => {
                if (this.disabled) { return;}

                const key = this._keyOf(cb.value);
                const exists = this._value.some(v => this._keyOf(v) === key);

                if (checked && !exists) {
                    this._value = [...this._value, cb.value];
                } else if (!checked && exists) {
                    this._value = this._value.filter(v => this._keyOf(v) !== key);
                }

                this.onChange(this._value);
                this.valueChange.emit(this._value);
            });

            this._subs.push(sub);
        });
    }

    private _clearSubscriptions() {
        this._subs.forEach(s => s.unsubscribe());
        this._subs = [];
    }

    private _syncFromValue() {
        if (!this.boxes) return;

        const keys = new Set(this._value.map(v => this._keyOf(v)));
        this.boxes.forEach(cb => {
            cb.checked = keys.has(this._keyOf(cb.value));
            cb.indeterminate = false;
        });
    }

    private _syncDisabled() {
        if (!this.boxes) return;
        this.boxes.forEach(cb => {
            cb.disabled = this._disabled;
        });
    }

    private _keyOf(v: any): any {
        return this.trackBy ? this.trackBy(v) : v;
    }
}
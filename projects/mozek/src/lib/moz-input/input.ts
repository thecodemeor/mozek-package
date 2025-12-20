// ============================================================================
// Mozek Input Styles
// ============================================================================
// Defines base and variant styles for the Input component in the
// Mozek Design System. Inputs capture user text or numeric data
// with clear focus states and adaptive styling.
//
// Customizable Props:
// - type, color, model, disabled, placeholder, icon, full (width),
//   readonly, clearable, hint, label, error
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------


import {
    Component,
    ChangeDetectionStrategy,
    Input,
    forwardRef,
    ViewChild,
    ElementRef,
    ContentChild,
    TemplateRef,
    booleanAttribute,
    HostBinding,
    AfterViewInit,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type MozCardModel =
    | 'outline'
    | 'fill'

type MozCardType =
    | 'text'
    | 'email'
    | 'number'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'

let uid = 0;

@Component({
    selector: 'moz-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './input.html',
    styleUrls: ['./input.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MozInput),
        multi: true
    }]
})
export class MozInput implements ControlValueAccessor, AfterViewInit, OnDestroy {
    @Input() model: MozCardModel = 'outline';
    @Input() type: MozCardType = 'text';
    @Input() label?: string;
    @Input() placeholder?: string;
    @Input() hint?: string;
    @Input() error?: string;
    @Input({ transform: booleanAttribute }) clearable = false;
    @Input({ transform: booleanAttribute }) showPasswordToggle = true;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) readonly = false;
    @Input({ transform: booleanAttribute }) full = false;

    @ContentChild('mozPrefix', { read: TemplateRef }) prefixTpl?: TemplateRef<any>;
    @ContentChild('mozSuffix', { read: TemplateRef }) suffixTpl?: TemplateRef<any>;

    @ViewChild('inputEl', { static: true }) inputEl!: ElementRef<HTMLInputElement>;

    id = `moz-input-${++uid}`;
    describedBy = `${this.id}-desc`;
    private _value: any = '';

    // CVA bridge
    onChange: (v: any) => void = () => {};
    onTouched: () => void = () => {};

    get value() { return this._value; }
    set value(v: any) {
        this._value = v ?? '';
        this.onChange(this._value);
    }

    // Host bindings
    @HostBinding('style.width') get hostWidth() { return this.full ? '100%' : ''; }
    @HostBinding('class.disabled') get hostDisabled() { return this.disabled; }
    @HostBinding('class.readonly') get hostReadOnly() { return this.readonly; }
    @HostBinding('attr.aria-disabled') get ariaDisabled() { return String(this.disabled); }
    @HostBinding('attr.aria-readonly') get ariaReadonly() { return String(this.readonly); }

    // Lifecycle
    ngAfterViewInit(): void {}
    ngOnDestroy(): void {}

    // CVA
    writeValue(v: any): void { this._value = v ?? ''; }
    registerOnChange(fn: any): void { this.onChange = fn; }
    registerOnTouched(fn: any): void { this.onTouched = fn; }
    setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }

    // Events
    handleInput(e: Event) {
        const t = e.target as HTMLInputElement;
        this.value = t.value;
    }

    handleFocusOut() {
        this.onTouched();
    }

    clear() {
        if (this.disabled || this.readonly) return;
        this.value = '';
        // Move focus back to input for smooth UX
        queueMicrotask(() => this.inputEl?.nativeElement?.focus());
    }

    // Password toggle
    reveal = false;
    toggleReveal() {
        if (this.type !== 'password') return;
        this.reveal = !this.reveal;
        queueMicrotask(() => this.inputEl?.nativeElement?.focus());
    }

    get inputTypeComputed(): string {
        if (this.type === 'password') return this.reveal ? 'text' : 'password';
        return this.type;
    }

    get isErrored(): boolean {
        return !!this.error;
    }

    get modelClass(): string {
        return `moz-input--${this.model}`;
    }
}
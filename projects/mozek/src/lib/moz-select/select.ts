// ============================================================================
// Mozek Select Styles
// ============================================================================
// Defines base and variant styles for the Select component in the
// Mozek Design System. Selects provide a controlled way for users
// to choose one or multiple options from a structured dropdown.
//
// Customizable Props:
// - color, model, full (width), disabled, placeholder
// - multiple, clearable, icon, size
//
// Behavior:
// - Smooth dropdown open/close animation
// - Keyboard navigation (↑ ↓ Enter Esc)
// - Supports custom option templates
// - Optional prefix and suffix icons
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
    ContentChildren,
    QueryList,
    ElementRef,
    ViewChild,
    HostBinding,
    forwardRef,
    booleanAttribute,
    AfterContentInit,
    ChangeDetectorRef,
    inject,
    HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MozOption } from './option';
import { MozIcon } from '../moz-icon/icon';

let uid = 0;

@Component({
    selector: 'moz-select',
    standalone: true,
    imports: [CommonModule, MozIcon],
    templateUrl: './select.html',
    styleUrls: ['./select.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MozSelect),
        multi: true
    }]
})
export class MozSelect<T = any> implements ControlValueAccessor, AfterContentInit {
    @Input() label?: string;
    @Input() placeholder = 'Please select';
    @Input() error?: string;
    @Input() hint?: string;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input() model: 'outline' | 'fill' = 'outline';

    @Output() changed = new EventEmitter<T | null>();

    @ContentChildren(MozOption) optionList!: QueryList<MozOption<T>>;
    @ViewChild('trigger', { static: true }) triggerRef!: ElementRef<HTMLButtonElement>;

    @HostBinding('attr.aria-disabled') get ariaDisabled() { return String(this.disabled); }
    @HostBinding('class.disabled') get hostDisabled() { return this.disabled; }

    id = `moz-select-${++uid}`;
    open = false;
    activeIndex = -1;

    private host = inject(ElementRef<HTMLElement>);
    private cdr = inject(ChangeDetectorRef);

    private _value: T | null = null;

    // CVA callbacks
    onChange: (v: T | null) => void = () => {};
    onTouched: () => void = () => {};

    // ---------------------------------------------------------------------------
    // Lifecycle
    // ---------------------------------------------------------------------------
    ngAfterContentInit() {
        this.optionList.changes.subscribe(() => this.cdr.markForCheck());
    }

    // ---------------------------------------------------------------------------
    // Close when clicking outside the component
    // ---------------------------------------------------------------------------
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        if (!this.open) return;

        const target = event.target as Node | null;
        if (!target) return;

        if (!this.host.nativeElement.contains(target)) {
            this.closePanel();
        }
    }

    // ---------------------------------------------------------------------------
    // Getters / setters
    // ---------------------------------------------------------------------------
    get options(): MozOption<T>[] {
        return this.optionList?.toArray() ?? [];
    }

    get value(): T | null { return this._value; }
    set value(v: T | null) {
        this._value = v;
        this.onChange(v);
        this.changed.emit(v);
    }

    get selectedOption(): MozOption<T> | undefined {
        return this.options.find(o => this.equals(o.value, this.value));
    }

    get displayLabel(): string {
        return this.selectedOption?.label || '';
    }

    get isErrored() { return !!this.error; }

    get modelClass() {
        return `moz-select moz-select--${this.model}`;
    }

    // ---------------------------------------------------------------------------
    // CVA
    // ---------------------------------------------------------------------------
    writeValue(v: any): void {
        this._value = v;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        if (isDisabled && this.open) {
        this.closePanel();
        }
    }

    // ---------------------------------------------------------------------------
    // Open / close
    // ---------------------------------------------------------------------------
    togglePanel() {
        if (this.disabled) return;
        this.open ? this.closePanel() : this.openPanel();
    }

    openPanel() {
        this.open = true;
        this.activeIndex = Math.max(0, this.options.findIndex(o => this.equals(o.value, this.value)));
        this.cdr.markForCheck();
    }

    closePanel() {
        this.open = false;
        this.activeIndex = -1;
        this.onTouched();
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Select / clear
    // ---------------------------------------------------------------------------
    selectOption(opt: MozOption<T>) {
        if (opt.disabled) return;
        this.value = opt.value;
        this.closePanel();
    }

    clearSelection(e?: MouseEvent) {
        e?.stopPropagation();
        this.value = null;
    }

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    isSelected(opt: MozOption<T>) {
        return this.equals(opt.value, this.value);
    }

    equals(a: any, b: any) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}
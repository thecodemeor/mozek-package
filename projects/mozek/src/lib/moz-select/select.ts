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
    HostListener,
    DestroyRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MozOption } from './option';
import { MozIcon } from '../moz-icon/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

let uid = 0;

@Component({
    selector: 'moz-select',
    standalone: true,
    imports: [MozIcon],
    templateUrl: './select.html',
    styleUrls: ['./select.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => MozSelect),
        multi: true
    }]
})
export class MozSelect<T = unknown> implements ControlValueAccessor, AfterContentInit {
    /** Accent color used for focus/selected states. */
    @Input() color: 'primary' | 'danger' | 'success' | 'warning' | 'text' = 'primary';
    @Input() label?: string;
    @Input() placeholder = 'Please select';
    @Input() error?: string;
    @Input() hint?: string;
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input({ transform: booleanAttribute }) full = false;
    @Input() model: 'outline' | 'fill' = 'outline';
    @Input() compareWith: (a: T | null, b: T | null) => boolean = Object.is;

    @Output() changed = new EventEmitter<T | null>();

    @ContentChildren(MozOption) optionList!: QueryList<MozOption<T>>;
    @ViewChild('trigger', { static: true }) triggerRef!: ElementRef<HTMLButtonElement>;

    @HostBinding('attr.aria-disabled') get ariaDisabled(): string { return String(this.disabled); }
    @HostBinding('class.disabled') get hostDisabled(): boolean { return this.disabled; }
    @HostBinding('class.full') get hostFull(): boolean { return this.full; }
    @HostBinding('style.--moz-select-accent') get accentCssVar(): string {
        return `var(--moz-color-${this.color})`;
    }

    id = `moz-select-${++uid}`;
    open = false;
    activeIndex = -1;

    private host = inject(ElementRef<HTMLElement>);
    private cdr = inject(ChangeDetectorRef);
    private destroyRef = inject(DestroyRef);

    private _value: T | null = null;

    // CVA callbacks
    onChange: (v: T | null) => void = () => {};
    onTouched: () => void = () => {};

    // ---------------------------------------------------------------------------
    // Lifecycle
    // ---------------------------------------------------------------------------
    ngAfterContentInit(): void {
        this.optionList.changes
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.cdr.markForCheck());
    }

    // ---------------------------------------------------------------------------
    // Close when clicking outside the component
    // ---------------------------------------------------------------------------
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
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

    get isErrored(): boolean { return !!this.error; }

    get modelClass(): string {
        return `moz-select moz-select--${this.model}`;
    }

    // ---------------------------------------------------------------------------
    // CVA
    // ---------------------------------------------------------------------------
    writeValue(v: T | null): void {
        this._value = v;
        this.cdr.markForCheck();
    }

    registerOnChange(fn: (v: T | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
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
    togglePanel(): void {
        if (this.disabled) return;
        this.open ? this.closePanel() : this.openPanel();
    }

    openPanel(): void {
        this.open = true;
        this.activeIndex = Math.max(0, this.options.findIndex(o => this.equals(o.value, this.value)));
        this.cdr.markForCheck();
    }

    closePanel(): void {
        this.open = false;
        this.activeIndex = -1;
        this.onTouched();
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Select / clear
    // ---------------------------------------------------------------------------
    selectOption(opt: MozOption<T>): void {
        if (opt.disabled) return;
        this.value = opt.value;
        this.closePanel();
    }

    clearSelection(e?: MouseEvent): void {
        e?.stopPropagation();
        this.value = null;
    }

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------
    isSelected(opt: MozOption<T>): boolean {
        return this.equals(opt.value, this.value);
    }

    equals(a: T | null, b: T | null): boolean {
        return this.compareWith(a, b);
    }
}
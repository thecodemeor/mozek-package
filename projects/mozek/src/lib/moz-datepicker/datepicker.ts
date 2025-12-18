// ============================================================================
// Mozek Datepicker Styles
// ============================================================================
// Defines base and variant styles for the Datepicker component in the
// Mozek Design System. Datepickers allow users to select dates from
// a calendar surface with clear and consistent visual states.
//
// Customizable Props:
// - color, model, full (width), disabled
// - view (day, month, year)
// - range, firstDayOfWeek, min, max
//
// States:
// - default, hover, focus, selected, today
// - in-range, range-edge, disabled, outside-month
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
    ElementRef,
    HostListener,
    ChangeDetectorRef,
    booleanAttribute,
    inject,
    OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MozOverlayService } from './moz-datepicker.service';

import { MozButton } from '../moz-button/button';
import { MozButtonIcon } from '../moz-button-icon/button-icon'; // adjust path
import { MozIcon } from '../moz-icon/icon';

interface CalendarCell {
    date: Date;
    inCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    disabled: boolean;
}

interface MonthCell {
    index: number;    // 0-11
    label: string;    // Jan, Feb, ...
    isCurrent: boolean;
}

interface YearCell {
    year: number;
    isCurrent: boolean;
}

type ViewMode = 'date' | 'month' | 'year';

@Component({
    selector: 'moz-datepicker',
    standalone: true,
    templateUrl: './datepicker.html',
    styleUrls: ['./datepicker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MozButton, MozButtonIcon, MozIcon]
})
export class MozDatepicker implements OnInit, OnDestroy {
    @Input() label?: string = '';
    @Input() model: 'outline' | 'fill' = 'outline';
    @Input() min?: Date;
    @Input() max?: Date;
    @Input({ transform: booleanAttribute }) disabled = false;

    private id = `moz-datepicker-${Math.random().toString(36).slice(2)}`;
    private _value: Date | null = null;
    private _firstDayOfWeek: 0 | 1 = 1;   /** 0 = Sunday, 1 = Monday */

    @Input() get value(): Date | null {
        return this._value;
    }
    set value(v: Date | null) {
        this._value = v ? this.stripTime(v) : null;
        const base = this._value ?? new Date();
        this.viewYear = base.getFullYear();
        this.viewMonth = base.getMonth();

        // align year page to this viewYear
        this.yearPageStart = Math.floor(this.viewYear / this.yearPageSize) * this.yearPageSize;

        this.buildCalendar();
        this.buildMonthGrid();
        this.buildYearGrid();
        this.cdr.markForCheck();
    }

    @Input() get firstDayOfWeek(): 0 | 1 {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(v: 0 | 1) {
        this._firstDayOfWeek = v ?? 1;
        this.buildWeekdayLabels();
        this.buildCalendar();
        this.cdr.markForCheck();
    }

    @Output() valueChange = new EventEmitter<Date | null>();

    private host = inject(ElementRef<HTMLElement>);
    private cdr = inject(ChangeDetectorRef);

    open = false;
    viewYear: number;
    viewMonth: number;    // 0-11
    weekdayLabels: string[] = [];
    calendarCells: CalendarCell[] = [];
    viewMode: ViewMode = 'date';
    monthCells: MonthCell[] = [];
    yearCells: YearCell[] = [];
    readonly yearPageSize = 12;
    yearPageStart!: number;
    private readonly monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    constructor() {
        const today = new Date();
        this.viewYear = today.getFullYear();
        this.viewMonth = today.getMonth();

        this.yearPageStart = Math.floor(this.viewYear / this.yearPageSize) * this.yearPageSize;

        this.buildWeekdayLabels();
        this.buildCalendar();
        // this.buildMonthGrid();
        // this.buildYearGrid();
    }

    private overlay = inject(MozOverlayService);
    private destroy$ = new Subject<void>();
    ngOnInit() {
        this.overlay.onOpen()
        .pipe(takeUntil(this.destroy$))
        .subscribe(openId => {
        if (openId !== this.id && this.open) {
            this.open = false;
            this.cdr.markForCheck();
        }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    get modelClass() {
        return `moz-datepicker moz-datepicker--${this.model}`;
    }

    get displayValue(): string | null { return this._value ? this._value.toISOString() : null;}

    get headerDay(): string {
        const d = this._value ?? new Date(this.viewYear, this.viewMonth, 1);
        return d.getDate().toString();
    }

    get selectedMonth(): string {
        const d = new Date(this.viewYear, this.viewMonth, 1);
        return d.toLocaleString(undefined, { month: 'long' });
    }

    get selectedYear(): string {
        const d = new Date(this.viewYear, this.viewMonth, 1);
        return d.toLocaleString(undefined, { year: 'numeric' });
    }

    private get minYear(): number {
        return this.min ? this.min.getFullYear() : 1900;
    }

    private get maxYear(): number {
        return this.max ? this.max.getFullYear() : 2100;
    }

    togglePanel(event: MouseEvent): void {
        if (this.disabled) return;
        event.stopPropagation();
        const next = !this.open;
        if (next) {
            this.overlay.announceOpen(this.id);
            this.viewMode = 'date';
        }
        this.open = next;
        this.cdr.markForCheck();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
        if (!this.open) return;
        const target = event.target as Node | null;
        if (target && !this.host.nativeElement.contains(target)) {
            this.open = false;
            this.cdr.markForCheck();
        }
    }

    setView(mode: ViewMode): void {
        this.viewMode = mode;
        if (mode === 'month') {
            this.buildMonthGrid();
        } else if (mode === 'year') {
            this.buildYearGrid();
        }
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Month navigation (in date view)
    // ---------------------------------------------------------------------------
    prevMonth(): void {
        if (this.viewMonth === 0) {
            this.viewMonth = 11;
            this.viewYear--;
        } else {
            this.viewMonth--;
        }

        this.yearPageStart = Math.floor(this.viewYear / this.yearPageSize) * this.yearPageSize;

        this.buildCalendar();
        this.buildMonthGrid();
        this.buildYearGrid();
        this.cdr.markForCheck();
    }

    nextMonth(): void {
        if (this.viewMonth === 11) {
            this.viewMonth = 0;
            this.viewYear++;
        } else {
            this.viewMonth++;
        }

        this.yearPageStart = Math.floor(this.viewYear / this.yearPageSize) * this.yearPageSize;

        this.buildCalendar();
        this.buildMonthGrid();
        this.buildYearGrid();
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Date selection (date view)
    // ---------------------------------------------------------------------------
    onSelectCell(cell: CalendarCell): void {
        if (cell.disabled) return;
        this.selectDate(cell.date, true);
    }

    private selectDate(d: Date, closeAfter: boolean): void {
        const normalized = this.stripTime(d);
        this._value = normalized;
        this.valueChange.emit(normalized);
        this.buildCalendar();
        this.buildMonthGrid();
        this.buildYearGrid();
        if (closeAfter) {
            this.open = false;
        }
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Month picker (month view)
    // ---------------------------------------------------------------------------
    private buildMonthGrid(): void {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        this.monthCells = this.monthShort.map((label, index) => {
            const isCurrent = (this.viewYear === currentYear && index === currentMonth);
            return { index, label, isCurrent };
        });
    }

    onMonthCellClick(m: MonthCell): void {
        this.viewMonth = m.index;
        this.buildCalendar();
        this.viewMode = 'date';
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Year picker (year view, paged)
    // ---------------------------------------------------------------------------
    private buildYearGrid(): void {
        const today = new Date();
        const currentYear = today.getFullYear();

        const minY = this.minYear;
        const maxY = this.maxYear;

        // clamp page start into min/max
        if (this.yearPageStart < minY) {
            this.yearPageStart = minY;
        }
        if (this.yearPageStart + this.yearPageSize - 1 > maxY) {
            this.yearPageStart = Math.max(minY, maxY - this.yearPageSize + 1);
        }

        const years: YearCell[] = [];
        for (let i = 0; i < this.yearPageSize; i++) {
            const year = this.yearPageStart + i;
            years.push({
                year,
                isCurrent: year === currentYear
            });
        }

        this.yearCells = years;
    }

    onYearCellClick(y: YearCell): void {
        this.viewYear = y.year;
        this.yearPageStart = Math.floor(this.viewYear / this.yearPageSize) * this.yearPageSize;
        this.buildCalendar();
        this.viewMode = 'month';
        this.buildMonthGrid();
        this.cdr.markForCheck();
    }

    prevYearPage(): void {
        const minY = this.minYear;
        this.yearPageStart = Math.max(minY, this.yearPageStart - this.yearPageSize);
        this.buildYearGrid();
        this.cdr.markForCheck();
    }

    nextYearPage(): void {
        const maxY = this.maxYear;
        this.yearPageStart = Math.min(
        Math.max(this.minYear, maxY - this.yearPageSize + 1),
        this.yearPageStart + this.yearPageSize
        );
        this.buildYearGrid();
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Calendar building (date view)
    // ---------------------------------------------------------------------------
    private buildWeekdayLabels(): void {
        const base = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        if (this._firstDayOfWeek === 1) {
            this.weekdayLabels = base.slice(1).concat(base[0]); // Monday-first
        } else {
            this.weekdayLabels = base.slice();
        }
    }

    private buildCalendar(): void {
        const cells: CalendarCell[] = [];
        const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
        const firstDay = firstOfMonth.getDay(); // 0-6
        const offset = (firstDay - this._firstDayOfWeek + 7) % 7;
        const startDate = 1 - offset;

        const today = this.stripTime(new Date());
        const selected = this._value ? this.stripTime(this._value) : null;
        const min = this.min ? this.stripTime(this.min) : undefined;
        const max = this.max ? this.stripTime(this.max) : undefined;

        for (let i = 0; i < 42; i++) {
            const day = startDate + i;
            const date = new Date(this.viewYear, this.viewMonth, day);
            const normalized = this.stripTime(date);

            const inCurrentMonth = date.getMonth() === this.viewMonth;
            const isToday = this.isSameDate(normalized, today);
            const isSelected = selected ? this.isSameDate(normalized, selected) : false;
            const disabled =
                (min && normalized.getTime() < min.getTime()) ||
                (max && normalized.getTime() > max.getTime()) ||
                false;

            cells.push({
                date: normalized,
                inCurrentMonth,
                isToday,
                isSelected,
                disabled
            });
        }

        this.calendarCells = cells;
    }

    // ---------------------------------------------------------------------------
    // Utils
    // ---------------------------------------------------------------------------
    private stripTime(d: Date): Date {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    private isSameDate(a: Date, b: Date): boolean {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }
}
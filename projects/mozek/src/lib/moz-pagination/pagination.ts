// ============================================================================
// Mozek Pagination Styles
// ============================================================================
// Defines base and variant styles for the Pagination component in the
// Mozek Design System. Pagination controls let users navigate large
// datasets or long lists in discrete pages with clear affordances.
//
// Customizable Props:
// - color, size, model
// - disabled, compact, rounded
//
// Behavior:
// - Highlights active page
// - Supports previous / next controls
// - Supports first / last and ellipsis slots
// - Adapts layout for small viewports
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
    ChangeDetectorRef,
    OnChanges,
    SimpleChanges,
    inject,
    HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MozIcon } from '../moz-icon/icon'; // adjust path if needed

export interface MozPageChangeEvent {
    pageIndex: number;
    pageSize: number;
}
import { MozColorName, isHexColor } from '../helper/export';

type PaginationViewItem =
    | { type: 'page'; pageIndex: number; label: string; selected: boolean }
    | { type: 'ellipsis'; label: '…' };

@Component({
    selector: 'moz-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule, MozIcon],
    templateUrl: './pagination.html',
    styleUrls: ['./pagination.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozPagination implements OnChanges {
    @Input() color: MozColorName | string = 'default';
    @Input() length = 0;
    @Input() pageSize = 10;
    @Input() get pageIndex(): number {
        return this._pageIndex;
    }
    set pageIndex(value: number) {
        const clamped = this.clampPageIndex(value);
        if (clamped === this._pageIndex) return;
        this._pageIndex = clamped;
        this.updateView();
    }
    @Input() showFirstLast = true;
    @Input() showPageSizeOptions = false;
    @Input() pageSizeOptions: number[] = [5, 10, 25, 50];
    @Input() ariaLabel = 'Pagination';

    @Output() pageIndexChange = new EventEmitter<number>();
    @Output() pageChange = new EventEmitter<MozPageChangeEvent>();

    totalPages = 0;
    viewItems: PaginationViewItem[] = [];

    protected _pageIndex = 0;
    private cdr = inject(ChangeDetectorRef);

    // ---------------------------------------------------------------------------
    // Angular lifecycle
    // ---------------------------------------------------------------------------

    ngOnChanges(changes: SimpleChanges): void {
        // When length or pageSize changes, recompute total pages & view
        if (changes['length'] || changes['pageSize']) {
            this.updateView();
        }
    }

    @HostBinding('style.--moz-pagination-color') get hostColor() {
        if (isHexColor(this.color)) {
            return this.color as string;
        }
        
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            case 'success': return 'var(--moz-color-success)';
            case 'warn':    return 'var(--moz-color-warning)';
            case 'danger':  return 'var(--moz-color-danger)';
            default: return 'var(--moz-color-primary)';
        }
    }

    // ---------------------------------------------------------------------------
    // View building
    // ---------------------------------------------------------------------------

    private updateView(): void {
        this.totalPages = this.calcTotalPages();
        this._pageIndex = this.clampPageIndex(this._pageIndex);
        this.viewItems = this.buildViewItems();
        this.cdr.markForCheck();
    }

    private calcTotalPages(): number {
        if (this.pageSize <= 0 || this.length <= 0) return 0;
        return Math.max(1, Math.ceil(this.length / this.pageSize));
    }

    private clampPageIndex(index: number): number {
        if (this.totalPages === 0) return 0;
        return Math.min(Math.max(index, 0), this.totalPages - 1);
    }

    // ---------------------------------------------------------------------------
    // Public getters for template
    // ---------------------------------------------------------------------------

    get isFirstPage(): boolean {
        return this._pageIndex <= 0;
    }

    get isLastPage(): boolean {
        return this.totalPages === 0 || this._pageIndex >= this.totalPages - 1;
    }

    get pageLabel(): string {
        if (!this.totalPages) return 'Page 0 of 0';
        return `Page ${this._pageIndex + 1} of ${this.totalPages}`;
    }

    // ---------------------------------------------------------------------------
    // Navigation actions
    // ---------------------------------------------------------------------------

    goToFirst(): void {
        if (this.isFirstPage) return;
        this.setPage(0);
    }

    goToPrevious(): void {
        if (this.isFirstPage) return;
        this.setPage(this._pageIndex - 1);
    }

    goToNext(): void {
        if (this.isLastPage) return;
        this.setPage(this._pageIndex + 1);
    }

    goToLast(): void {
        if (this.isLastPage) return;
        this.setPage(this.totalPages - 1);
    }

    onPageItemClick(item: PaginationViewItem): void {
        if (item.type === 'ellipsis') return;
        if (item.pageIndex === this._pageIndex) return;
        this.setPage(item.pageIndex);
    }

    onPageSizeChange(size: number): void {
        if (size <= 0) return;

        // Preserve current item offset as much as possible
        const oldPageSize = this.pageSize;
        const itemOffset = this._pageIndex * oldPageSize;

        this.pageSize = size;
        this.totalPages = this.calcTotalPages();

        const newPageIndex = this.clampPageIndex(Math.floor(itemOffset / this.pageSize));
        this._pageIndex = newPageIndex;

        this.emitChange();
        this.viewItems = this.buildViewItems();
        this.cdr.markForCheck();
    }

    // ---------------------------------------------------------------------------
    // Internal helpers
    // ---------------------------------------------------------------------------

    private setPage(index: number): void {
        const clamped = this.clampPageIndex(index);
        if (clamped === this._pageIndex) return;
        this._pageIndex = clamped;
        this.emitChange();
        this.viewItems = this.buildViewItems();
        this.cdr.markForCheck();
    }

    private emitChange(): void {
        this.pageIndexChange.emit(this._pageIndex);
        this.pageChange.emit({
            pageIndex: this._pageIndex,
            pageSize: this.pageSize
        });
    }
    
    private buildViewItems(): PaginationViewItem[] {
        const items: PaginationViewItem[] = [];
        const total = this.totalPages;

        if (total <= 0) return items;

        const currentIndex = this._pageIndex; // 0-based
        const current = currentIndex + 1;     // 1-based
        const last = total;

        // Small page counts → no ellipsis, show everything
        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                items.push({
                type: 'page',
                pageIndex: i - 1,
                label: String(i),
                selected: i === current
                });
            }
        return items;
        }

        const addPage = (page: number) => {
            items.push({
                type: 'page',
                pageIndex: page - 1,
                label: String(page),
                selected: page === current
            });
        };

        const addDots = () => {
            items.push({ type: 'ellipsis', label: '…' });
        };

        // ------------------------------------------------------------------
        // Case 1: Near the start → [1] 2 3 4 5 … last
        // ------------------------------------------------------------------
        if (current <= 5) {
            addPage(1);
            addPage(2);
            addPage(3);
            addPage(4);
            addPage(5);
            addDots();
            addPage(last);
            return items;
        }
        if (current >= last - 4) {
            addPage(1);
            addDots();
            addPage(last - 4);
            addPage(last - 3);
            addPage(last - 2);
            addPage(last - 1);
            addPage(last);
            return items;
        }
        addPage(1);
        addDots();
        addPage(current - 1);
        addPage(current);
        addPage(current + 1);
        addDots();
        addPage(last);
        return items;
    }
}
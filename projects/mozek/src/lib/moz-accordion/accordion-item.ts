import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    inject,
    HostBinding,
    booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozAccordion } from './accordion';
import { MozIcon } from '../moz-icon/icon'; // adjust path

let nextId = 0;

@Component({
    selector: 'moz-accordion-item',
    standalone: true,
    templateUrl: './accordion-item.html',
    styleUrls: ['./accordion-item.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MozIcon]
})
export class MozAccordionItem {
    @Input({ transform: booleanAttribute }) disabled = false;
    @Input() get expanded(): boolean {
        return this._expanded;
    }
    set expanded(value: boolean) {
        this._setExpandedInternal(!!value);
    }

    @Output() expandedChange = new EventEmitter<boolean>();
    @HostBinding('class.moz-accordion-item--expanded')
    get hostExpanded(): boolean {
        return this._expanded;
    }

    @HostBinding('class.moz-accordion-item--disabled')
    get hostDisabled(): boolean {
        return this.disabled;
    }

    // neighbour styling flags
    @HostBinding('class.moz-accordion-item--before-expanded')
    beforeExpanded = false;
    @HostBinding('class.moz-accordion-item--after-expanded')
    afterExpanded = false;

    // DI
    private accordion = inject(MozAccordion, {
        optional: true,
        host: true,
        skipSelf: true
    });
    private cdr = inject(ChangeDetectorRef);

    // internal state
    private _expanded = false;

    /** ID used by header for aria-controls */
    panelId = `moz-accordion-panel-${++nextId}`;

    // ---------------------------------------------------------------------------
    // Header interactions
    // ---------------------------------------------------------------------------
    onHeaderClick(): void {
        if (this.disabled) return;
        this.toggle();
    }

    onHeaderKeydown(event: KeyboardEvent): void {
        if (this.disabled) return;
        if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
            this.toggle();
        }
    }

    // ---------------------------------------------------------------------------
    // Public toggle used by header interactions
    // ---------------------------------------------------------------------------
    toggle(): void {
        const next = !this._expanded;
        this._setExpandedInternal(next);

        if (this.accordion) {
            this.accordion._notifyItemToggled(this);
        }
    }

    /** Called by MonAccordion when it needs to force state (close others) */
    _setExpandedFromAccordion(expanded: boolean): void {
        this._setExpandedInternal(expanded, false);
    }

    private _setExpandedInternal(value: boolean, emit = true): void {
        if (this._expanded === value) return;

        this._expanded = value;
        if (emit) {
            this.expandedChange.emit(this._expanded);
        }
        this.cdr.markForCheck();
    }

    /** Called by MonAccordion to mark neighbour roles */
    _setSiblingState(before: boolean, after: boolean): void {
        this.beforeExpanded = before;
        this.afterExpanded = after;
        this.cdr.markForCheck();
    }
}
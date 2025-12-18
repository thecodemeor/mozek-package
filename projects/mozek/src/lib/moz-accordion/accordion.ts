// ============================================================================
// Mozek Accordion Styles
// ============================================================================
// Defines base and variant styles for the Accordion component in the
// Mozek Design System. Accordions provide collapsible sections that
// help organize dense information and improve content hierarchy.
//
// Customizable Props:
// - disabled, expanded, bordered, chevron (icon direction)
//
// Behavior:
// - Smooth expand and collapse animations
// - Optional chevron icon rotation
// - Supports nested accordions
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------

import {
    Component,
    ChangeDetectionStrategy,
    ContentChildren,
    QueryList,
    Input,
    AfterContentInit,
    ChangeDetectorRef,
    inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozAccordionItem } from './accordion-item';

@Component({
    selector: 'moz-accordion',
    standalone: true,
    templateUrl: './accordion.html',
    styleUrls: ['./accordion.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule]
})
export class MozAccordion implements AfterContentInit {
    @Input() multi = false;

    @ContentChildren(MozAccordionItem, { descendants: true })
    items!: QueryList<MozAccordionItem>;

    private cdr = inject(ChangeDetectorRef);

    ngAfterContentInit(): void {
        // reserved for future behaviour
    }

    /** Called by an item WHEN it toggles itself */
    _notifyItemToggled(source: MozAccordionItem): void {
        if (!this.items) return;

        const items = this.items.toArray();

        // Reset all neighbour flags
        items.forEach(i => i._setSiblingState(false, false));

        // Single-open mode: close others
        if (!this.multi && source.expanded) {
            items.forEach(i => {
                if (i !== source && i.expanded) {
                    i._setExpandedFromAccordion(false);
                }
            });
        }

        // Mark neighbours of the expanded item
        if (source.expanded) {
            const index = items.indexOf(source);
            if (index > 0) {
                // previous item is BEFORE expanded
                items[index - 1]._setSiblingState(true, false);
            }
            if (index < items.length - 1) {
                // next item is AFTER expanded
                items[index + 1]._setSiblingState(false, true);
            }
        }

        this.cdr.markForCheck();
    }
}
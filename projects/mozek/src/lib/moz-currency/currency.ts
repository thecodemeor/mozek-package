// ============================================================================
// Mozek Currency Styles
// ============================================================================
// Defines display and formatting styles for the Currency component in the
// Mozek Design System. Used to present numeric values with clear visual
// hierarchy and localized currency formatting.
//
// Customizable Props:
// - value, currency, size, symbol
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------


import {
    Component,
    Input,
    AfterContentInit,
    ViewChild,
    ElementRef,
    inject,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    booleanAttribute
} from '@angular/core';

const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', KRW: '₩',
    INR: '₹', MYR: 'RM', SGD: 'S$', IDR: 'Rp', PHP: '₱', THB: '฿',
    VND: '₫', AUD: 'A$', NZD: 'NZ$', CAD: 'C$', CHF: 'Fr', SEK: 'kr',
    NOK: 'kr', DKK: 'kr', PLN: 'zł', RUB: '₽', ZAR: 'R', NGN: '₦',
    AED: 'د.إ', SAR: 'ر.س', KWD: 'د.ك', BHD: '.د.ب', OMR: 'ر.ع',
    PKR: 'Rs', LKR: 'Rs', BDT: '৳', HKD: 'HK$', TWD: 'NT$'
};

@Component({
    selector: 'moz-currency',
    templateUrl: './currency.html',
    styleUrls: ['./currency.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class MozCurrency implements AfterContentInit {
    @Input() value?: number;
    @Input() currency = 'MYR';
    @Input({ transform: booleanAttribute }) symbol = false;
    
    @ViewChild('slot', { static: true }) slot!: ElementRef<HTMLElement>;
    
    private cdr = inject(ChangeDetectorRef);
    
    displayValue = '';

    ngAfterContentInit(): void {
        const raw = this.value != null
            ? String(this.value)
            : (this.slot.nativeElement.textContent ?? '').trim();

        const num = parseFloat(raw);
        this.displayValue = isNaN(num) ? '' : num.toFixed(2);
        this.cdr.markForCheck();
    }

    get currencyLabel(): string {
        if (this.symbol) {
            const symbol = CURRENCY_SYMBOLS[this.currency.toUpperCase()];
            return symbol || this.currency;
        }
        return this.currency;
    }
}
import {
    Component, Input, ElementRef, HostBinding, ChangeDetectionStrategy, booleanAttribute, inject
} from '@angular/core';

@Component({
    selector: 'moz-option',
    standalone: true,
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozOption<T = any> {
    @Input() value!: T;
    @Input({ transform: booleanAttribute }) disabled = false;

    public elementRef = inject(ElementRef<HTMLElement>);

    @HostBinding('attr.role') role = 'option';
    @HostBinding('class.is-disabled') get isDisabled() { return this.disabled; }

    /** Read projected label text */
    get label(): string {
        return (this.elementRef.nativeElement.textContent ?? '').trim();
    }
}
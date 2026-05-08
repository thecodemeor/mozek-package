import { Component, Input } from '@angular/core';

@Component({
    selector: 'moz-tooltip',
    standalone: true,
    imports: [],
    template: `
        <div 
            class="moz-tooltip-popup" 
            [class.moz-tooltip--visible]="visible"
            [class]="'moz-tooltip-popup--' + position"
            [style.left.px]="left"
            [style.top.px]="top"
            role="tooltip"
        >
            {{ text }}
            <div class="moz-tooltip-popup__arrow" [style.left.px]="arrowLeft">
                <svg width="20" viewBox="0 0 100 40" fill="red" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,0 Q 45, 5 50,40 Q 55,5 100,0 Z" />
                </svg>
            </div>
        </div>
    `,
    styleUrls: ['./tooltip.component.scss']
})
export class MozTooltipComponent {
    @Input() text: string = '';
    @Input() position: 'top' | 'bottom' = 'top';
    @Input() left: number = 0;
    @Input() top: number = 0;
    @Input() arrowLeft: number = 0;
    @Input() visible: boolean = false;
}
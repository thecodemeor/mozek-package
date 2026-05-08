import { 
    Component, 
    inject, 
    computed,
    ChangeDetectionStrategy
} from '@angular/core';
import { MozSnackbarService, MozSnackbarType } from './snackbar.service';
import { MozIcon } from '../moz-icon/icon';
import { MozButtonIcon } from '../moz-button-icon/button-icon';

@Component({
    selector: 'moz-snackbar',
    standalone: true,
    imports: [MozIcon, MozButtonIcon],
    host: {
        '[class.moz-snackbar--top-left]': 'position() === "top-left"',
        '[class.moz-snackbar--top-right]': 'position() === "top-right"',
        '[class.moz-snackbar--bottom-left]': 'position() === "bottom-left"',
        '[class.moz-snackbar--bottom-right]': 'position() === "bottom-right"',
        '[class.moz-snackbar--top-center]': 'position() === "top-center"',
        '[class.moz-snackbar--bottom-center]': 'position() === "bottom-center"',
    },
    template: `
        @if (snackbarService.activeSnackbar(); as active) {
            <div class="moz-snackbar-container"
                 [class.moz-snackbar--visible]="!active.leaving"
                 [class]="'moz-snackbar--' + active.type"
                 (mouseenter)="onMouseEnter()"
                 (mouseleave)="onMouseLeave()"
                 role="status"
                 aria-live="polite">
                
                <div class="moz-snackbar-content">
                    <moz-icon class="moz-snackbar-icon" [color]="iconColor(active.type)">{{ iconName(active.type) }}</moz-icon>
                    <span class="moz-snackbar-message">{{ active.message }}</span>
                </div>
                
                <moz-button-icon class="moz-snackbar-close" model="tonal" (click)="close()">
                    <moz-icon size="25">close_circle</moz-icon>
                </moz-button-icon>
            </div>
        }
    `,
    styleUrls: ['./snackbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozSnackbarComponent {
    snackbarService = inject(MozSnackbarService);

    position = computed(() => this.snackbarService.activeSnackbar()?.position ?? 'top-right');

    iconName(type: MozSnackbarType) {
        switch (type) {
            case 'success': return 'check_circle';
            case 'error': return 'danger_triangle';
            case 'warning': return 'danger_circle';
            default: return 'info_circle';
        }
    }

    iconColor(type: MozSnackbarType) {
        switch (type) {
            case 'success': return 'success';
            case 'error': return 'danger';
            case 'warning': return 'warn';
            default: return 'primary';
        }
    }

    onMouseEnter() {
        this.snackbarService.pause();
    }

    onMouseLeave() {
        this.snackbarService.resume();
    }

    close() {
        this.snackbarService.hide();
    }   
}

import { 
    Component, 
    inject, 
    computed,
    ChangeDetectionStrategy
} from '@angular/core';
import { MozSnackbarQueueService, MozSnackbarQueueType } from './snackbar-queue.service';
import { MozIcon } from '../moz-icon/icon';
import { MozButtonIcon } from '../moz-button-icon/button-icon';

@Component({
    selector: 'moz-snackbar-queue',
    standalone: true,
    imports: [MozIcon, MozButtonIcon],
    template: `
        @for (snackbar of activeSnackbars(); track snackbar.id) {
            <div class="moz-snackbar-container"
                [class.moz-snackbar--visible]="!snackbar.leaving"
                [class]="'moz-snackbar--' + snackbar.type"
                (mouseenter)="onMouseEnter(snackbar.id)"
                (mouseleave)="onMouseLeave(snackbar.id)"
                role="status"
                aria-live="polite"
            >
                
                <div class="moz-snackbar-content">
                    <moz-icon class="moz-snackbar-icon" [color]="iconColor(snackbar.type)" [name]="iconName(snackbar.type)"></moz-icon>
                    <span class="moz-snackbar-message">{{ snackbar.message }}</span>
                </div>
                
                <moz-button-icon class="moz-snackbar-close" model="tonal" (click)="close(snackbar.id)">
                    <moz-icon size="25">close_circle</moz-icon>
                </moz-button-icon>
            </div>
        }
    `,
    styleUrls: ['./snackbar-queue.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MozSnackbarQueue {
    snackbarService = inject(MozSnackbarQueueService);

    activeSnackbars = this.snackbarService.activeSnackbars;

    iconName(type: MozSnackbarQueueType) {
        switch (type) {
            case 'success': return 'check_circle';
            case 'error': return 'danger_triangle';
            case 'warning': return 'danger_circle';
            default: return 'info_circle';
        }
    }

    iconColor(type: MozSnackbarQueueType) {
        switch (type) {
            case 'success': return 'success';
            case 'error': return 'danger';
            case 'warning': return 'warn';
            default: return 'primary';
        }
    }

    onMouseEnter(id: number) {
        this.snackbarService.pause(id);
    }

    onMouseLeave(id: number) {
        this.snackbarService.resume(id);
    }

    close(id: number) {
        this.snackbarService.hide(id);
    }   
}

import { Injectable, signal, computed } from '@angular/core';

export type MozSnackbarQueueType = 'success' | 'error' | 'warning' | 'info';

export interface MozSnackbarQueueState {
    id: number;
    message: string;
    type: MozSnackbarQueueType;
    duration: number;
    leaving?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class MozSnackbarQueueService {
    private nextId = 0;
    public activeSnackbars = signal<MozSnackbarQueueState[]>([]);
    
    private timers = new Map<number, ReturnType<typeof setTimeout>>();

    show(message: string, duration?: number): void;
    show(message: string, type?: MozSnackbarQueueType, duration?: number): void;
    show(message: string, arg2?: number | MozSnackbarQueueType, arg3?: number): void {
        let duration = 3000;
        let type: MozSnackbarQueueType = 'info';

        if (typeof arg2 === 'number') {
            duration = arg2;
        } else if (typeof arg2 === 'string') {
            type = arg2 as MozSnackbarQueueType;
            if (typeof arg3 === 'number') duration = arg3;
        }

        const state: MozSnackbarQueueState = { id: ++this.nextId, message, type, duration };
        
        this.activeSnackbars.update(snackbars => [...snackbars, state]);

        const active = this.activeSnackbars().filter(s => !s.leaving);
        if (active.length > 3) {
            this.hide(active[0].id);
        }

        this.startTimer(state);
    }

    pause(id: number): void {
        this.clearTimer(id);
    }

    resume(id: number): void {
        const current = this.activeSnackbars().find(s => s.id === id);
        if (current && !current.leaving) {
            this.startTimer(current);
        }
    }

    hide(id: number): void {
        this.clearTimer(id);
        
        this.activeSnackbars.update(snackbars => 
            snackbars.map(s => s.id === id ? { ...s, leaving: true } : s)
        );

        // Wait for the fade-out CSS transition before removing from the DOM
        setTimeout(() => {
            this.activeSnackbars.update(snackbars => snackbars.filter(s => s.id !== id));
        }, 200);
    }

    private startTimer(state: MozSnackbarQueueState): void {
        this.clearTimer(state.id);
        const timer = setTimeout(() => {
            this.hide(state.id);
        }, state.duration);
        this.timers.set(state.id, timer);
    }

    private clearTimer(id: number): void {
        if (this.timers.has(id)) {
            clearTimeout(this.timers.get(id));
            this.timers.delete(id);
        }
    }
}

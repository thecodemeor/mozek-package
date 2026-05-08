import { Injectable, signal } from '@angular/core';

export type MozSnackbarType = 'success' | 'error' | 'warning' | 'info';
export type MozSnackbarPosition = 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export interface MozSnackbarState {
  message: string;
  type: MozSnackbarType;
  position: MozSnackbarPosition;
  duration: number;
  leaving?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MozSnackbarService {
  public activeSnackbar = signal<MozSnackbarState | null>(null);
  private timer: any;

  show(message: string, duration?: number): void;
  show(message: string, type?: MozSnackbarType, position?: MozSnackbarPosition, duration?: number): void;
  show(message: string, arg2?: number | MozSnackbarType, arg3?: MozSnackbarPosition, arg4?: number) {
    let duration = 3000;
    let type: MozSnackbarType = 'info';
    let position: MozSnackbarPosition = 'top-right';

    if (typeof arg2 === 'number') {
      duration = arg2;
    } else if (typeof arg2 === 'string') {
      type = arg2 as MozSnackbarType;
      if (arg3) position = arg3;
      if (typeof arg4 === 'number') duration = arg4;
    }

    const state: MozSnackbarState = { message, type, position, duration };
    
    const current = this.activeSnackbar();
    if (current && !current.leaving) {
        // Interrupt the current one
        this.clearTimer();
        this.activeSnackbar.update(s => s ? { ...s, leaving: true } : null);
        
        // Wait for scale-fade-out CSS transition before showing the new one
        setTimeout(() => {
            this.display(state);
        }, 150);
    } else {
        this.display(state);
    }
  }

  private display(state: MozSnackbarState) {
    this.activeSnackbar.set(state);
    this.startTimer(state);
  }

  pause() {
    this.clearTimer();
  }

  resume() {
    const current = this.activeSnackbar();
    if (current && !current.leaving) {
      this.startTimer(current);
    }
  }

  hide() {
    this.clearTimer();
    const current = this.activeSnackbar();
    if (current && !current.leaving) {
        this.activeSnackbar.update(s => s ? { ...s, leaving: true } : null);
        setTimeout(() => {
            // Only set to null if we are still leaving the same snackbar
            if (this.activeSnackbar()?.leaving) {
                this.activeSnackbar.set(null);
            }
        }, 150);
    }
  }

  private startTimer(state: MozSnackbarState) {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.hide();
    }, state.duration);
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

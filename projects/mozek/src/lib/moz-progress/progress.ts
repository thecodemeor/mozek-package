// ============================================================================
// Mozek Progress Styles
// ============================================================================
// Defines base, variant, and animated styles for the Progress component in the
// Mozek Design System. Progress visually represents completion, loading, or
// performance states through linear and circular indicators with smooth
// transitions and customizable colors.
//
// Customizable Props:
// - type (linear | circular), color, size, value, max, label, striped,
//   animated, track-color, show-percentage, indeterminate
//
// -----------------------------------------------------------------------------
// Author: thecodemeor
// Version: 1.0
// -----------------------------------------------------------------------------

import { Component, Input, HostBinding } from '@angular/core';

type MozProgressModel =
    | 'ring'
    | 'line_spinner'
    | 'hourglass'
    | 'zoomies'
    | 'line_wobble'
    | 'infinity'
    | 'cardio'
    | 'helix'
    | 'newton'

@Component({
  selector: 'moz-progress',
  imports: [],
  templateUrl: './progress.html',
  styleUrl: './progress.scss'
})
export class MozProgress {
    @Input() model: MozProgressModel = 'ring';
    @Input() color: 'primary' | 'secondary' | 'default' = 'default';
    @Input() size: '20' | '40' | '60' | '80' | '100' = '40';
    @Input() speed: string = '1.5';

    @HostBinding('style.--moz-progress-color') get hostColor() {
        switch (this.color) {
            case 'primary': return 'var(--moz-color-primary)';
            case 'secondary': return 'var(--moz-color-secondary)';
            default: return 'var(--moz-color-text)';
        }
    }
    @HostBinding('style.--moz-progress-size') get hostSize() { return `${this.size}px` }
    @HostBinding('style.--moz-progress-speed') get hostSpeed() { return `${this.speed}s` }
}
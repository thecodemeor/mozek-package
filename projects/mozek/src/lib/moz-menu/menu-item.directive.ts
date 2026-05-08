import { Directive } from '@angular/core';

@Directive({
  selector: '[moz-menu-item]',
  standalone: true,
  host: {
    'class': 'moz-menu-item'
  }
})
export class MozMenuItem {}

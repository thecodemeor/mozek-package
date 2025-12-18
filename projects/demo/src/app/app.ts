import { Component, signal } from '@angular/core';
import {
  MozButton,
  MozCard, MonCardMedia, MonCardHeader, MonCardHeaderActions, MonCardBody, MonCardFooter, MonCardFooterActions,
  MozBadge,
  MozCurrency,
  MozDivider,
  MozInput,
  MozIcon,
  MozPagination, MozPageChangeEvent,
  MozProgress,
  MozSwitch,
  MozButtonIcon,
  MozDatepicker,
  MozSelect, MozOption,
  MozAccordion, MozAccordionItem,
  MozCheckbox, MozCheckboxGroup,
  MozRadio, MozRadioGroup
} from 'mozek';

@Component({
  selector: 'app-root',
  imports: [
    MozButton,
    MozCard, MonCardMedia, MonCardHeader, MonCardHeaderActions, MonCardBody, MonCardFooter, MonCardFooterActions,
    MozBadge,
    MozCurrency,
    MozDivider,
    MozInput,
    MozIcon,
    MozPagination,
    MozProgress,
    MozSwitch,
    MozButtonIcon,
    MozDatepicker,
    MozSelect, MozOption,
    MozAccordion, MozAccordionItem,
    MozCheckbox, MozCheckboxGroup,
    MozRadio, MozRadioGroup
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');

  pageIndex = 0;     // zero-based
  pageSize = 2;
  items = Array.from({ length: 20 }).map((_, i) => `Item ${i + 1}`);
  onPageChange(event: MozPageChangeEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    console.log('Page change:', event);
  }

  get pagedItems() {
    const start = this.pageIndex * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  checked = false;

  box1 = false;
  box2 = false;
  box3 = false;
  onCheckboxChange(checked: boolean) {
    this.checked = checked;
    console.log('Checkbox changed:', checked);
  }

  fruit = 'apple';
  food = 'pizza';
  house = 'apartment';
  career = 'engineer';
}
import { Component, signal, inject } from '@angular/core';
import {
  MozButton,
  MozCard, MozCardMedia, MozCardHeader, MozCardBody, MozCardFooter,
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
  MozRadio, MozRadioGroup,
  MozDialogService, MozDialogRef,
  MozTooltip,
  MozSnackbarQueueComponent,
  MozSnackbarQueueService,
  MozSnackbarComponent,
  MozSnackbarService,
  MozMenu, MozMenuTrigger, MozMenuItem,
  MozBreadcrumbs, MozBreadcrumbItem,
  MenuTutor, MenuTutorTrigger
} from 'mozek';

@Component({
  selector: 'app-root',
  imports: [
    MozButton,
    MozCard, MozCardMedia, MozCardHeader, MozCardBody, MozCardFooter,
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
    MozRadio, MozRadioGroup,
    MozTooltip,
    MozSnackbarQueueComponent,
    MozSnackbarComponent,
    MozMenu, MozMenuTrigger, MozMenuItem,
    MozBreadcrumbs,
    MenuTutor, MenuTutorTrigger
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
  private dialogService = inject(MozDialogService);
  private snackbarQueue = inject(MozSnackbarQueueService);
  private basicSnackbar = inject(MozSnackbarService);

  breadcrumbItems: MozBreadcrumbItem[] = [
    { label: 'Home', icon: 'home' },
    { label: 'Checkout' },
    { label: 'Payment' },
    { label: 'Delivery address' },
    { label: 'Payment' },
    { label: 'Delivery address' },
    { label: 'Payment' },
    { label: 'Delivery address' },
    { label: 'Payment' },
    { label: 'Delivery address' },
    { label: 'Payment' },
    { label: 'Delivery address' }
  ];

  showSnackbar(type: any) {
    const messages = {
      success: 'Action completed successfully!',
      error: 'An error occurred while saving.',
      warning: 'Your session is about to expire.',
      info: 'New updates are available.'
    };
    this.snackbarQueue.show(messages[type as keyof typeof messages], type);
  }

  showBasicSnackbar(type: any, position: any = 'top-right') {
    const messages = {
      success: 'Basic Success completed!',
      error: 'Basic Error occurred.',
      warning: 'Basic Warning.',
      info: 'Basic Info.'
    };
    this.basicSnackbar.show(messages[type as keyof typeof messages], type, position);
  }

  openDialog() {
    const dialogRef = this.dialogService.open(ExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        alert('Dialog returned: ' + result);
      }
    });
  }

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

@Component({
  selector: 'example-dialog',
  standalone: true,
  imports: [MozButton],
  template: `
    <h2>Hello from Dialog!</h2>
    <p>This is a programmatically opened dialog.</p>
    <div style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem;">
      <moz-button model="outline" color="secondary" (click)="closeDialog(null)">Cancel</moz-button>
      <moz-button (click)="closeDialog('Confirmed!')">Confirm</moz-button>
    </div>
  `
})
export class ExampleDialogComponent {
  dialogRef = inject(MozDialogRef);

  closeDialog(result: any) {
    this.dialogRef.close(result);
  }
}
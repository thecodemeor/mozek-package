import { Observable, Subject } from 'rxjs';

/**
 * Configuration options for MozDialog.
 */
export interface MozDialogConfig<D = any> {
  data?: D;
  width?: string;
  maxWidth?: string;
  disableClose?: boolean;
}

/**
 * Reference to a dialog opened via the MozDialogService.
 */
export class MozDialogRef<R = any> {
  private readonly _afterClosed = new Subject<R | undefined>();

  constructor(public readonly id: string) {}

  /**
   * Closes the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(dialogResult?: R): void {
    this._afterClosed.next(dialogResult);
    this._afterClosed.complete();
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }
}

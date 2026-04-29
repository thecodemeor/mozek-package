import { 
  Injectable, 
  ComponentRef, 
  ApplicationRef, 
  Type, 
  createComponent,
  EnvironmentInjector
} from '@angular/core';
import { MozDialogContainer } from './dialog-container';
import { MozDialogConfig, MozDialogRef } from './dialog-ref';

@Injectable({ providedIn: 'root' })
export class MozDialogService {
  private dialogRefs: { ref: MozDialogRef, containerRef: ComponentRef<MozDialogContainer> }[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T, D = any, R = any>(component: Type<T>, config?: MozDialogConfig<D>): MozDialogRef<R> {
    const id = `moz-dialog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const dialogRef = new MozDialogRef<R>(id);

    // Create the container
    const containerRef = createComponent(MozDialogContainer, {
      environmentInjector: this.injector
    });

    // Pass data
    containerRef.instance.componentType = component;
    containerRef.instance.config = config || {};
    containerRef.instance.dialogRef = dialogRef;

    // Attach to Angular App so it runs change detection
    this.appRef.attachView(containerRef.hostView);

    // Append to DOM
    document.body.appendChild(containerRef.location.nativeElement);

    this.dialogRefs.push({ ref: dialogRef, containerRef });

    // Handle close
    dialogRef.afterClosed().subscribe(() => {
      this.closeDialog(dialogRef);
    });

    return dialogRef;
  }

  private closeDialog(dialogRef: MozDialogRef) {
    const index = this.dialogRefs.findIndex(d => d.ref === dialogRef);
    if (index > -1) {
      const { containerRef } = this.dialogRefs[index];
      
      // Trigger exit animation before destroying
      containerRef.instance.startExitAnimation(() => {
        this.appRef.detachView(containerRef.hostView);
        containerRef.destroy();
        this.dialogRefs.splice(index, 1);
      });
    }
  }
}

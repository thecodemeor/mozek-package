import { 
  Component, 
  ViewChild, 
  ViewContainerRef, 
  ComponentRef, 
  Type, 
  OnInit,
  ChangeDetectorRef,
  inject,
  Injector
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozDialogConfig, MozDialogRef } from './dialog-ref';

@Component({
  selector: 'moz-dialog-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-container.html',
  styleUrls: ['./dialog-container.scss']
})
export class MozDialogContainer implements OnInit {
  @ViewChild('portal', { read: ViewContainerRef, static: true })
  portal!: ViewContainerRef;

  animationState: 'void' | 'enter' = 'void';
  
  componentRef!: ComponentRef<any>;
  componentType!: Type<any>;
  config!: MozDialogConfig;
  dialogRef!: MozDialogRef;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);

  ngOnInit() {
    // Trigger entrance animation on next tick
    setTimeout(() => {
      this.animationState = 'enter';
      this.cdr.markForCheck();
    });
    this.attachComponent();
  }

  attachComponent() {
    this.portal.clear();
    
    // Create a custom injector that provides the MozDialogRef and config
    const dialogInjector = Injector.create({
      providers: [
        { provide: MozDialogRef, useValue: this.dialogRef },
        { provide: 'MozDialogConfig', useValue: this.config }
      ],
      parent: this.injector
    });

    this.componentRef = this.portal.createComponent(this.componentType, {
      injector: dialogInjector
    });
  }

  onBackdropClick() {
    if (!this.config?.disableClose) {
      this.dialogRef.close();
    }
  }

  startExitAnimation(onComplete: () => void) {
    this.animationState = 'void';
    this.cdr.markForCheck();
    // Wait for CSS transition to finish before destroying
    setTimeout(() => {
      onComplete();
    }, 400); // 400ms matches the transform transition duration
  }
}

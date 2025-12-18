import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MozOverlayService {
    private openId$ = new Subject<string>();

    announceOpen(id: string) {
        this.openId$.next(id);
    }

    onOpen(): Observable<string> {
        return this.openId$.asObservable();
    }
}
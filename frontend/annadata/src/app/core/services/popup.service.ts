import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }
  private popupTrigger = new Subject<{
    message: string;
    type: 'success' | 'error' | 'info' | 'confirm';
    confirmCallback?: () => void;
  }>();

  popupState$ = this.popupTrigger.asObservable();

  open(message: string, type: 'success' | 'error' | 'info' | 'confirm', confirmCallback?: () => void) {
    this.popupTrigger.next({ message, type, confirmCallback });
  }
}

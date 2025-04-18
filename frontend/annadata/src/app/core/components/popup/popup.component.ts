import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [TitleCasePipe, NgIf, NgClass],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | 'confirm' = 'info';
  @Input() confirmCallback: () => void = () => {};

  showModal = false;

  open(message: string, type: 'success' | 'error' | 'info' | 'confirm', confirmCallback?: () => void) {
    this.message = message;
    this.type = type;
    this.confirmCallback = confirmCallback || (() => {});
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  onConfirm() {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.close();
  }
}

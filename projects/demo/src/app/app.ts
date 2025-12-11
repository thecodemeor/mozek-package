import { Component, signal } from '@angular/core';
import {
  MozButton,
  MozCard, MonCardMedia, MonCardHeader, MonCardHeaderActions, MonCardBody, MonCardFooter, MonCardFooterActions
} from 'mozek';

@Component({
  selector: 'app-root',
  imports: [
    MozButton,
    MozCard, MonCardMedia, MonCardHeader, MonCardHeaderActions, MonCardBody, MonCardFooter, MonCardFooterActions
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
}
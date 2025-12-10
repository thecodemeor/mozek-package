import { Component, signal } from '@angular/core';
import { MozButton } from 'mozek';

@Component({
  selector: 'app-root',
  imports: [MozButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
}
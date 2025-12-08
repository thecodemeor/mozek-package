import { Component, signal } from '@angular/core';
import { MonButton } from 'mozek';

@Component({
  selector: 'app-root',
  imports: [MonButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('demo');
}
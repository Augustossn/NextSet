import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ou .scss se escolheu Sass
})
export class AppComponent {
  title = 'nextset-front';
  constructor(public router: Router) {}
}
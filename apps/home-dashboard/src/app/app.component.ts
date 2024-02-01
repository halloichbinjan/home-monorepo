import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, MenuComponent],
  selector: 'dashboard-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkMode = true;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  @HostBinding('class.dark-theme') get applyDarkModeClass() {
    this.doc.body.classList.toggle('dark-theme', this.isDarkMode);
    return this.isDarkMode;
  }

  @HostBinding('class.light-theme') get applyLightModeClass() {
    this.doc.body.classList.toggle('light-theme', this.isDarkMode);

    return !this.isDarkMode;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}

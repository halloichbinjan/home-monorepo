import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'dashboard-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkMode = true;

  @HostBinding('class.dark-theme') get applyDarkModeClass() {
    return this.isDarkMode;
  }

  @HostBinding('class.light-theme') get applyLightModeClass() {
    return !this.isDarkMode;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}

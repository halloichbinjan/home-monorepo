import { Component, HostBinding } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '@home-monorepo/ui-kit';

@Component({
  standalone: true,
  imports: [RouterModule, CardComponent],
  selector: 'dashboard-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isDarkMode = false;

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

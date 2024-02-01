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
  @HostBinding('class.dark-theme') darkTheme = true;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '@home-monorepo/ui-kit';

@Component({
  selector: 'dashboard-welcome-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.scss',
})
export class WelcomeCardComponent {}

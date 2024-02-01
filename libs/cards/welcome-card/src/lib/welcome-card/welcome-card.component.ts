import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'home-monorepo-welcome-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome-card.component.html',
  styleUrl: './welcome-card.component.css',
})
export class WelcomeCardComponent {}

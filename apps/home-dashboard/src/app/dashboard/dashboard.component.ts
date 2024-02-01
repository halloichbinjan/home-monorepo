import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '@home-monorepo/ui-kit';

@Component({
  selector: 'dashboard-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

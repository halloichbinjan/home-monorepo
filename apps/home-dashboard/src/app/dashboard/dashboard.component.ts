import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DevicePowerCardComponent } from '@home-monorepo/device-power-card';
import { WelcomeCardComponent } from '@home-monorepo/welcome-card';

@Component({
  selector: 'dashboard-dashboard',
  standalone: true,
  imports: [CommonModule, WelcomeCardComponent, DevicePowerCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}

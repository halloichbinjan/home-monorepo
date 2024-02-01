import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {}

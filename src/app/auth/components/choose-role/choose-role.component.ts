import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-role',
  standalone: true,
  imports: [],
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.css']
})
export class ChooseRoleComponent {
  selectedRole: 'landlord' | 'tenant' | null = null;

  constructor(private router: Router) {}

  selectRole(role: 'landlord' | 'tenant') {
    this.selectedRole = role;
  }

  continue() {
    if (this.selectedRole) {

      this.router.navigate(['/home']);
    }
  }
}

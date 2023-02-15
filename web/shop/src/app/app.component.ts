import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';
  isLoggedIn = false;
  constructor(private auth: AuthService) {}

  ngOnInit(): void 
  {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) 
    {
      this.isLoggedIn = JSON.parse(storedIsLoggedIn);
    }
  }
  
  logout()
  {
    this.auth.logout().subscribe({
      next: res => {
        console.log(res)
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        this.isLoggedIn = false;
      },
      error: err => {
        console.log('Hiba! Az azonosítás sikertelen!')
      }
    });
  }

  
}

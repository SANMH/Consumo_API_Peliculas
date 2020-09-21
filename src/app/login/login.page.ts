import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;

  constructor(private authSvc: AuthService, private router: Router) {  }
 
  onLogin(){

    this.authSvc.login(this.email, this.password).then(res => {      
    }).catch(erro => alert('Los datos son incorrectos'))
  }
/*
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }
*/
  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['movies']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
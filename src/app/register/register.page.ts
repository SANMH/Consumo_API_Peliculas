import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {}
  public email:string;
  public name:string;
  public lastname:string;
  public password:string;
  public phone:string;

  onRegister(){
    this.authSvc.register(this.email,this.password, this.name, this.lastname, this.phone).then( auth=>{
      this.router.navigate(['/movies'])
      console.log(auth)
    } ).catch(err=> console.log(err))
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['movies']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
}
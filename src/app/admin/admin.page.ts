import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.interface';
import { TodoService } from '../services/todo.service';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage  implements OnInit{
  users: User[];

  constructor(private todoService: TodoService,public AuthService: AuthService, private router: Router){}
  
  ngOnInit(){
    this.todoService.getTodos().subscribe((users) =>{
      console.log('Users', users);
      this.users = users;
    })
  }
  onRemove(idTask:string){
    this.todoService.removeTodo(idTask);
  }
  onLogout(){
    this.AuthService.logout();
  }
  onMovie(){
    this.router.navigate(['movies']);
  }
  onHistorial(){
    this.router.navigate(['historial']);
  }
}

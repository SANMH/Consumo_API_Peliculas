import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.interface';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Historial } from '../shared/historial.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: false,
    name: '',
    lastname: '',
    phone: ''
  };

  historial: Historial[];

  UserId= null;

  constructor(private route: ActivatedRoute, private nav: NavController, private todoService: TodoService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.UserId = this.route.snapshot.params['id'];
    if (this.UserId){
      this.loadTodo();
    }
    //***** */
    this.todoService.getTodosH().subscribe((historial) =>{
      console.log('Hisotiral', historial);
      this.historial = historial;
    })
  }
  
  async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'
    });
    await loading.present();

    this.todoService.getTodo(this.UserId).subscribe(user => {
      loading.dismiss();
      this.user = user;
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.interface';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Historial } from '../shared/historial.interface';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.page.html',
  styleUrls: ['./admin-details.page.scss'],
})
export class AdminDetailsPage implements OnInit {
  
  user: User = {
    uid: '',
    email: '',
    displayName: '',
    emailVerified: false,
    name: '',
    lastname: '',
    phone: ''
  };

  UserId= null;

  HistorialID = null;

//**** */

  historial: Historial[];

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

  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'Saving....'
    });
    await loading.present();
 
    if (this.UserId) {
      this.todoService.updateTodo(this.user, this.UserId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('admin');
      });
    } else {
      this.todoService.addTodo(this.user).then(() => {
        loading.dismiss();
        this.nav.navigateForward('admin');
      });
    }
  }
  async onRemoveTodo(idTodo:string) {
    this.todoService.removeTodo(idTodo);
  }
}
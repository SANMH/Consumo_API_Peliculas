import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Historial } from '../shared/historial.interface';


import { User } from '../shared/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  private userCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;


  private historialCollection: AngularFirestoreCollection<Historial>;
  private historial: Observable<Historial[]>;

  constructor(db:AngularFirestore) { 
    //Usuario
    this.userCollection = db.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    //Historial
    this.historialCollection = db.collection<Historial>('historial');
    this.historial = this.historialCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getTodos(){
    return this.users;
  }

  //Historial
  getTodosH(){
    return this.historial;
  }
  getTodoH(id: string){
    return this.historialCollection.doc<Historial>(id).valueChanges();
  }


  getTodo(id: string){
    return this.userCollection.doc<User>(id).valueChanges();
  }

  updateTodo(user:User, id: string){
    return this.userCollection.doc(id).update(user);
  }
  
  addTodo(user: User){
    return this.userCollection.add(user);
  }
  
  removeTodo(id: string){
    return this.userCollection.doc(id).delete();
  }

}

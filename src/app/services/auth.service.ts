import { Injectable } from '@angular/core';
import { User } from '../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,  private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  //Registro 
  register(email: string, password: string, name: string, lastname: string, phone: string){
    return new Promise ((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password).then(res=>{
        const uid = res.user.uid;
        this.afs.collection('users').doc(uid).set({
          name: name,
          lastname: lastname,
          uid: uid,
          email: email,
          phone: phone
        })
        resolve(res)
      }).catch(err => reject(err))
    })
  }

  //iniciar sesión
  login(email:string, password:string){
    return new Promise((resolve, rejected)=>{
      this.afAuth.signInWithEmailAndPassword(email,password).then(user=>{
        console.log(user)

        //Usuario administrador
        if(email == 'sanmhepn@hotmail.com'){
          this.router.navigate(['admin']);
        }else{
          this.router.navigate(['movies']);
        }
        
      }).catch(err=>rejected(err));
    });

  }

  //Verificar correo
  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  //cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut().then(() => {
        this.router.navigate(['login']);
      });
    } catch (error) {
      console.log('Error->', error);
    }
  }


  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
    };

    return userRef.set(data, { merge: true });
  }

  getuser(){
    return this.afAuth.authState;
  }
}
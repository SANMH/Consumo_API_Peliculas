import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

//record

import { User } from '../../shared/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  information = null;

  historial = "";
  name: string;
  uid: string;
  public user$: Observable<User>;

  lat: number;
  lon: number;
  Title: string;

  documentID = Math.floor(Math.random()*(1000000000-1+1)+1);

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService,
    private geolocation: Geolocation,

    public afAuth: AngularFireAuth, private afs: AngularFirestore, private authservice: AuthService) {
    }

  ngOnInit() {
    console.log(this.documentID)

    let id= this.activatedRoute.snapshot.paramMap.get('id');
    this.movieService.getDetails(id).subscribe(result => {
      console.log('details:', result);
      this.information = result;

    //variable del nombre     
    this.authservice.getuser().subscribe(user => {
      this.name = user.email;
      this.uid = user.uid;
      console.log("hola" + this.name);

    //Nombre de la pelicula o serie
     this.historial = result['Title'];  
     console.log("EXX" + this.historial)  
      
    //Geolocalizacion
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      console.log(this.lat)
      console.log(this.lon)

    //almacenar en historial
      this.afs.collection('historial').doc(this.documentID.toString()).set({
        historial: this.historial,
        usuario: this.name,
        uid: this.uid,
        latitud: this.lat,
        longitud: this.lon
      })
    });

     

    })

    });

  }

  openWebsite(){
    window.open(this.information.Website, 'http://www.omdbapi.com');
  }

}

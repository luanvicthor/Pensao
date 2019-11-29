import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { auth } from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email: string = null;
  protected pws: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private msg: MensagemService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.localAtual()
  }

  onSubmit(fc) {
    this.login()
  }

  login() {
    this.msg.presentLoading()
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        this.msg.dismissLoading()
        this.router.navigate([''])
      },
      err => {
        console.log(err);
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!", "Não foi encotrado o usuario!");
      }
    )
  }

  loginGoogle() {
    if (!this.platform.is("cordova")) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(res => {
          console.log(res)
          this.router.navigate([''])
        })
        .catch(err => console.error(err))
    } else {
      this.googlePlus.login({})
        .then(res => {
          console.log(res)
          this.router.navigate([''])
        })
        .catch(err => console.error(err))
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    )
  }

  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("latitude: ", resp.coords.latitude)
      console.log("longitude: ", resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}

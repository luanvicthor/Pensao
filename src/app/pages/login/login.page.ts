import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

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
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  onSubmit(fc) {
    this.login()
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        this.router.navigate([''])
      },
      err => {
        console.log(err);
        this.msg.presentAlert("Ops!", "Não foi encotrado o usuario!");
      }
    )
  }

  loginGoogle() {
    if (!this.platform.is("cordova")) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.googlePlus.login({})
        .then(res =>{
          console.log(res)          
          this.router.navigate([''])
        })
        .catch(err => console.error(err));
    }
  }

  logout() {
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    )
  }

}

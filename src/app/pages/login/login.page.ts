import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string = null;
  protected pws:string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router:Router,
    private msg:MensagemService
  ) { }

  ngOnInit() {
  }
  
  onSubmit(fc){
    this.login()
  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res=>{
        this.router.navigate([''])
      },
      err=>{
        console.log(err);
        this.msg.presentAlert("Ops!", "Não foi encotrado o usuario!");
      }
    )
  }

  logout(){
    this.afAuth.auth.signOut();
  }

}

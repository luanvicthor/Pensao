import { MensagemService } from './../../services/mensagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  


  constructor(
    private afAuth: AngularFireAuth,
    protected email:string = null,
    protected pws:string = null,
    private router:Router,
    private msg:MensagemService
    
  ) { }

  ngOnInit() {
  }

  onSubmit(fc){

  }

  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res=>{
        this.router.navigate([''])
      },
      err=>{
        console.log(err);
        this.msg.presentAlert("Ops", "Não foi encontrado o usuario");
      }
      )
  }
}

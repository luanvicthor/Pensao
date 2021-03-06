import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private alertController: AlertController,
    public loadingController: LoadingController
  ) { }

    async presentAlert(titulo:string, texto:string) {
      const alert = await this.alertController.create({
        header: titulo,
        //subHeader: 'Subtitle',
        message: texto,
        buttons: ['OK']
      });

      await alert.present();
  }
 

async presentLoading() {
  const loading = await this.loadingController.create({
    //message: 'Hellooo',
    //duration: 2000
    spinner:"dots"
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();

  console.log('Loading dismissed!');
}

async dismissLoading(){
  await this.loadingController.dismiss()
}
}


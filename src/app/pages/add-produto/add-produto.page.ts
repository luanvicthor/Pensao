import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Produto } from 'src/app/model/produto';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  LocationService
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-add-produto',
  templateUrl: './add-produto.page.html',
  styleUrls: ['./add-produto.page.scss'],
})
export class AddProdutoPage implements OnInit {

  protected produto: Produto = new Produto;

  constructor(
    private produtoService: ProdutoService,
    private msg: MensagemService,
    private router: Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private geolocation: Geolocation,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
    this.produto.fotos = null
  }

  onSubmit(form) {
    //console.log(this.produto);
    this.msg.presentLoading()
    this.produtoService.add(this.produto).then(
      res => {
        //console.log("Cadastrado! ", res);
        this.msg.dismissLoading()
        this.msg.presentAlert("OK, ok!", "Cadastrado com sucesso!");
        this.produto = new Produto;
        form.reset();
        this.router.navigate(['']);
      },
      erro => {
        console.log("Erro: ", erro);
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!", "Erro ao tentar cadastrar!\nVerique os dados ou se o e-mail já foi cadastrado!");
      }
    )
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.produto.fotos.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  pegarFoto() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      if (this.produto.fotos == null) {
        this.produto.fotos = []
      }
      this.produto.fotos.push(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  async escolherFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolhar Opção',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.tirarFoto()
          }
        },
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.pegarFoto()
          }
        },
        {
          text: 'Remover Foto',
          icon: 'qr-scanner',
          handler: () => {
            this.produto.fotos = null;
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }


  //Google Maps ------------------------------------------
  map: GoogleMap;
  local = { lat: 43.0741904, lng: -89.3809802 };

  loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.local.lat,
          lng: this.local.lng
        },
        zoom: 18,
        tilt: 30
      }
    }

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    this.minhaLocalizacao()

    this.adicionarPonto("blue", "VOCÊ", this.local);

    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      p => {
        this.adicionarPonto("red", "Produto", p[0])
        console.log(p[0]);
      }
    )
  }

  minhaLocalizacao() {
    LocationService.getMyLocation().then(
      (myLocation: MyLocation) => {
        this.local = myLocation.latLng
        console.log(this.local);
        this.map.setOptions({
          camera: {
            target: myLocation.latLng
          }
        })
      })
  }

  adicionarPonto(cor: string, nome: string, local: any) {
    let marker: Marker = this.map.addMarkerSync({
      title: nome,
      icon: cor,
      animation: 'DROP',
      position: local
    });
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert(nome);
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import IUser from '../../interfaces/IUser';
import { Geolocation } from '@ionic-native/geolocation';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocate: Geolocation, public auth: AuthProvider, public toast: ToastController, public camera: Camera) {
  }

  user: IUser = {
    name : "",
    email : "",
    email2 : "",
    password : "",
    avatar : "",
    lat: 0,
    lng: 0
  };

  bs64 = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.geolocate.getCurrentPosition().then((data) => {
      this.user.lat = data.coords.latitude;
      this.user.lng = data.coords.longitude;
    }).catch((error) => {
      console.error('Error getting location', error);
    });
  }

  register() {
    this.auth.register(this.user).subscribe(
      (ok) =>  {
        this.toast.create({
          message: 'Registered sucefully! time to login.',
          duration: 5000,
        }).present();
        this.navCtrl.pop()
      },
      (err) => {
        this.toast.create({
          message: err.errorMessage,
          duration: 5000,
        }).present()
      },
      () => console.log('Register finished')
    );
  }
  
  openGallery(){
    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    this.getPicture(options);
  }

  takePhoto(){
    let options: CameraOptions = {
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((b64img) => {
      this.user.avatar = 'data:image/jpeg;base64,' + b64img;
    });
  }

}

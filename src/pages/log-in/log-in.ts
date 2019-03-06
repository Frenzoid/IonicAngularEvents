import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import IUser from '../../interfaces/IUser';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  user: IUser = {name: "", password: "", email: "", lat: 0, lng: 0};
  
  constructor(public authProvider:AuthProvider, public navCtrl: NavController, public navParams: NavParams, public geolocate: Geolocation, public auth: AuthProvider, public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
    this.ionViewCanEnter();

    this.geolocate.getCurrentPosition().then((data) => {
      this.user.lat = data.coords.latitude;
      this.user.lng = data.coords.longitude;
    }).catch((error) => {
      console.error('Error getting location', error);
    });
  }

  ionViewCanEnter() {
    this.authProvider.isLogged().subscribe(ok => {
      if (ok) {
        console.log('can enter: ' + ok);
        this.navCtrl.setRoot("EventsListPage");
        return false;
      }
    });
  }

  authToServer() {
    this.auth.login(this.user).subscribe(
      (ok) =>  this.navCtrl.setRoot('EventsListPage'),
      (err) => {
        this.toast.create({
          message: err.errorMessage,
          duration: 5000,
        }).present();
      },
      () => console.log('login finished')
    );
  }

  createAccount(){
    this.navCtrl.push('RegisterPage');
  }

}
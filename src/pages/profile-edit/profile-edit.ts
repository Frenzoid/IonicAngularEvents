import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import IUser from '../../interfaces/IUser';
import { UsersProvider } from '../../providers/users/users';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
  user: IUser = this.navParams.data.user;
  password2: string;

  constructor(public camera: Camera, public toast: ToastController, public userService: UsersProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }

  updateUserData() {
    this.userService.updateUserData(this.user).subscribe((ok: boolean) => {
      if (ok) {
        this.toast.create({
          message: 'User data changed sucefully!',
          duration: 5000,
        }).present()
      }
    }, (error) => {
      this.toast.create({
        message: error,
        duration: 5000,
      }).present()
    },
      () => console.log('submit finished')
    );
  }

  updateUserCreds() {
    this.userService.updateUserCreds(this.user.password, this.password2).subscribe((ok: boolean) => {
      if (ok) {
        this.toast.create({
          message: 'User data changed sucefully!',
          duration: 5000,
        }).present()
      }
    }, (error) => {
      this.toast.create({
        message: error,
        duration: 5000,
      }).present()
    },
      () => console.log('submit finished')
    );
  }

  updateUserAvatar() {
    this.userService.updateUserAvatar(this.user.avatar).subscribe((ok: boolean) => {
      if (ok) {
        this.toast.create({
          message: 'User data changed sucefully!',
          duration: 5000,
        }).present()
      }
    }, (error) => {
      this.toast.create({
        message: error,
        duration: 5000,
      }).present()
    },
      () => console.log('submit finished')
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

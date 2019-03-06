import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import IEvent from '../../interfaces/IEvent';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatePicker } from '@ionic-native/date-picker';
import { Events } from 'ionic-angular';
import { SERVER } from '../../constants/constants';

/**
 * Generated class for the EventsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events-new',
  templateUrl: 'events-new.html',
})

export class EventsNewPage {
  newEvent: IEvent = {
    title: '',
    image: '',
    date: 'Select a date',
    description: '',
    price: 0,
    address: '',
    lng: 0,
    lat: 0,
    id: null
  };

  constructor(public eve: Events, private datePicker: DatePicker, public toast: ToastController, public navCtrl: NavController, public camera: Camera, public navParams: NavParams, public eventService: EventsProvider) {
  }

  triggerParentRefresh() {
    this.eve.publish('event:changes',this.newEvent.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsNewPage');
    if (this.navParams.data.event) {
      this.newEvent = this.navParams.data.event;
      let date = new Date(<string>this.newEvent.date);
      let month = (date.getMonth() + 1) + '';
      console.log(month);
      this.newEvent.date = date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month) + '-' + date.getDate();
      console.log(date)      // this.eventService.getEvent(this.navParams.data.id).subscribe(
     //  event => this.newEvent = event,
     //  error => {
     //     this.toast.create({
     //       message: error,
     //       duration: 5000,
     //    }).present();
     //    this.navCtrl.pop()
     //   },
     //   () => console.log('Editando evento')
     // );
    }
  }

  getCoords(coords) {
    this.newEvent.lat = coords.coords.lat;
    this.newEvent.lng = coords.coords.lng;
    console.log(coords);
  }

  chooseDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        let month = (date.getMonth() + 1) + '';
        this.newEvent.date = date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month) + '-' + date.getDate();
        console.log(date)
      },
      err => {
        this.toast.create({
          message: err,
          duration: 5000,
        }).present();
      }
    );
  }

  submitToServer() {
    if (!this.navParams.data.event) {
      this.eventService.addEvent(this.newEvent).subscribe((ok: boolean) => {
        if (ok) {
          this.toast.create({
            message: 'Evento Creado satisfactoriamente',
            duration: 5000,
          }).present();
          this.triggerParentRefresh();
          this.navCtrl.pop();
        }
      }, (error) => {
        this.toast.create({
          message: error,
          duration: 5000,
        }).present();
      },
        () => console.log('submit finished')
      );
    } else {

      let hasBS64 = true;

      if (this.newEvent.image.includes("://")) {
        const parts = this.newEvent.image.split("/").slice(3);
        this.newEvent.image = parts.join("/");
        hasBS64 = false;
      }

      this.eventService.updateEvent(this.newEvent).subscribe((ok: boolean) => {
        if (ok) {
          if(!hasBS64)
            this.newEvent.image = SERVER + '/' + this.newEvent.image;

          this.toast.create({
            message: 'Evento editado satisfactoriamente',
            duration: 5000,
          }).present();
          this.navCtrl.pop();
        }
      }, (error) => {
        this.toast.create({
          message: error,
          duration: 5000,
        }).present();
      },
        () => console.log('submit finished')
      );
    }
  }

  openGallery() {
    let options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    this.getPicture(options);
  }

  takePhoto() {
    let options: CameraOptions = {
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL
    }

    this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((b64img) => {
      this.newEvent.image = 'data:image/jpeg;base64,' + b64img;
    });
  }

}

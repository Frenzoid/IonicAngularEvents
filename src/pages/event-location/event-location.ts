import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import IEvent from '../../interfaces/IEvent';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/**
 * Generated class for the EventLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-location',
  templateUrl: 'event-location.html',
})
export class EventLocationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public launchNavigator: LaunchNavigator) {
    this.event = this.navParams.data;
    console.log(this.event);
  }
  
  event: IEvent;
  ionViewDidLoad() {
   
  }

  navigate() {
    let options: LaunchNavigatorOptions = {};

    this.launchNavigator.navigate([this.event.lat, this.event.lng], options)
      .then(ok => console.log("Navigation launched!"));
  }

}

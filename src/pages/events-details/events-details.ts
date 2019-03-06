import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import IEvent from '../../interfaces/IEvent';

/**
 * Generated class for the EventsDetailsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events-details',
  templateUrl: 'events-details.html'
})

export class EventsDetailsPage {

  eventInfoRoot = 'EventInfoPage'
  eventLocationRoot = 'EventLocationPage'
  eventAttendRoot = 'EventAttendPage'


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log(this.navParams.data);
  }

}

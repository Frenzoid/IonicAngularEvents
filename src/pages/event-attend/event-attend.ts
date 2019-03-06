import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import IEvent from '../../interfaces/IEvent';
import { AttendsProvider } from '../../providers/attends/attends';

/**
 * Generated class for the EventAttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-attend',
  templateUrl: 'event-attend.html',
})
export class EventAttendPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public attenProvider: AttendsProvider) {
    this.event = this.navParams.data;
    console.log(this.event);
  }
  
  event: IEvent;
  attendents: any;

  ionViewDidLoad() {
    this.attenProvider.getAttendants(this.event.id).subscribe(
      atendants => { this.attendents = atendants,
      console.log(atendants);},
      err => console.log(err),
      () => console.log("done loading attendants")
    );
  }

  gotouserprofile(atendant){
    console.log(atendant);
    this.navCtrl.push('ProfilePage', {id: atendant.id})
  }

}

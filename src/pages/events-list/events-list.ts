import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, Toast, ToastController } from 'ionic-angular';
import IEvent from '../../interfaces/IEvent';
import { EventsProvider } from '../../providers/events/events';
import { AuthProvider } from '../../providers/auth/auth';
import { NgZone } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

/**
 * Generated class for the EventsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events-list',
  templateUrl: 'events-list.html',
})
export class EventsListPage {

  events: any[] = [];

  constructor(private eve: Events, private toastCtrl: ToastController, public alert: AlertController, public navCtrl: NavController, public navParams: NavParams, public eventService: EventsProvider, public authProvice: AuthProvider, public zone: NgZone) {
    this.eve.subscribe('event:changes', (id = null) => {
      this.eventService.getEvents().subscribe(
        events => {
          console.log(id);
          console.log(events);
          this.events = events;

          if(id != null){
            console.log(events.filter(eve => eve.id == id));
            this.spawnDetails(events.filter(eve => eve.id == id));
          }else{
            console.log(events[this.events.length - 1]);
            this.spawnDetails(events[events.length - 1]);
          }
        },
        (error: string) => console.log(error),
        () => console.log('Event triggered')
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsListPage');
    this.ionViewCanEnter();

    this.eventService.getEvents().subscribe(
      events => {
        console.log(events);
        this.events = events;
      },
      (error: string) => console.log(error),
      () => console.log('Events loading finished!')
    );
  }

  refreshEvents(refresher: Refresher) {
    this.eventService.getEvents().subscribe(
      events => {
        console.log(events);
        this.events = events;
      },
      (error: string) => console.log(error),
      () => refresher.complete()
    );
  }

  ionViewCanEnter() {
    this.authProvice.isLogged().subscribe(ok => {
      if (!ok) {
        console.log('can enter: ' + !ok);
        this.navCtrl.setRoot("LogInPage");
        return false;
      }
    });
  }

  deleteEvent(index) {
    let del = this.alert.create({
      title: 'Confirm deletion',
      message: 'Do you want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Buy clicked');
            this.executeOrder66(index);
          }
        }
      ]
    });

    del.present();
  }

  executeOrder66(index){
    this.eventService.removeEvent(this.events[index].id).subscribe(
      ok => this.events.splice(index, 1),
      err => { console.log(err); 
        this.toastCtrl.create({
          message: 'Error deleting events, perhaps someone already bought tickets?',
          duration: 5000,
        }).present()},
      () => console.log('finished deleting')
    );
  }

  spawnDetails(event) {
    this.navCtrl.push("EventsDetailsPage", event);
  }

  spawnProfile(id){
    this.navCtrl.push("ProfilePage", {id: id});
  }
}

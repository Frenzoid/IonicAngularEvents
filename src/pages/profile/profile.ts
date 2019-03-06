import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import IUser from '../../interfaces/IUser';
import { UsersProvider } from '../../providers/users/users';
import IEvent from '../../interfaces/IEvent';
import { EventsProvider } from '../../providers/events/events';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: IUser = {name: "", password: "", email: "", lat: 0, lng: 0};
  userid: any;
  myEvents: IEvent[] = [];
  atEvents: IEvent[] = [];
  segment = 'profile';
  
  constructor(private eve: Events, public navCtrl: NavController, public navParams: NavParams, public userService: UsersProvider, public eventService: EventsProvider) {
    this.userid = this.navParams.data.id;
    console.log('PARAMETROS');
    console.log(this.userid);
    console.log('-----------');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log(this.userid);
    if(this.userid){
      console.log('HAY USUARIO ESPECIFICO');
      this.userService.getUser(this.userid).subscribe(
        user => {this.user = user;
          this.getUsersEvents();},
        err => console.log(err),
        () =>  console.log(this.userid)
      );
    }
    else{
      this.userService.getUser().subscribe(
        user => {
        this.user = user;
        this.getUsersEvents();},
        err => console.log(err),
        () =>  console.log(this.userid)
      );
    }
  }

  getUsersEvents(){
    this.eventService.getEvents('user/' + this.user.id).subscribe(
      events => {
        console.log(events);
        this.myEvents = events;
      },
      (error: string) => console.log(error),
      () => console.log('Events loading finished!')
    );

    this.eventService.getEvents('attend/').subscribe(
      events => {
        console.log(events);
        this.atEvents = events;
      },
      (error: string) => console.log(error),
      () => console.log('Events loading finished!')
    );
  }

  spawnDetails(event) {
    this.navCtrl.push("EventsDetailsPage", event);
  }

  spawnProfile(id){
    this.navCtrl.push("ProfilePage", {id: id});
  }
}

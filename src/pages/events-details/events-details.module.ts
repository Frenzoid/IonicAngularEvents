import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsDetailsPage } from './events-details';

@NgModule({
  declarations: [
    EventsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsDetailsPage),
  ]
})
export class EventsDetailsPageModule {}

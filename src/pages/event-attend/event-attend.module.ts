import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventAttendPage } from './event-attend';

@NgModule({
  declarations: [
    EventAttendPage,
  ],
  imports: [
    IonicPageModule.forChild(EventAttendPage),
  ],
})
export class EventAttendPageModule {}

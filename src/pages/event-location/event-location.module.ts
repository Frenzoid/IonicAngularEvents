import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLocationPage } from './event-location';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    EventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLocationPage),
    AgmCoreModule
  ],
})
export class EventLocationPageModule {}

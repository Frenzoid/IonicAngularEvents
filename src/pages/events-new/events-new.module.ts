import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsNewPage } from './events-new';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    EventsNewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsNewPage),
    AgmCoreModule
  ],
})
export class EventsNewPageModule {}

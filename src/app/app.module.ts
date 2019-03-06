import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventsProvider } from '../providers/events/events';
import { UsersProvider } from '../providers/users/users';
import { AuthProvider } from '../providers/auth/auth';
import { AuthTokenInterceptorService } from '../interceptors/auth-token-interceptor.service';
import { IonicStorageModule } from '@ionic/storage';

import { AttendsProvider } from '../providers/attends/attends';
import { PaymentsProvider } from '../providers/payments/payments';
import { EventsListPage } from '../pages/events-list/events-list';
import { ProfilePage } from '../pages/profile/profile';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { EventsNewPage } from '../pages/events-new/events-new';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { DatePicker } from '@ionic-native/date-picker';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2sYQIcXgK0jbglbKQHc_ImsBieJwohHQ',
      libraries: ['places']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptorService,
      multi: true,
    },
    
    LaunchNavigator,
    Geolocation,
    Camera,
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsProvider,
    UsersProvider,
    AuthProvider,
    AttendsProvider,
    PaymentsProvider,
    PayPal
  ]
})
export class AppModule {}

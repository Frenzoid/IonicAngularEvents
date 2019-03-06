import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import IEvent from '../../interfaces/IEvent';
import { EventsProvider } from '../../providers/events/events';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { PaymentsProvider } from '../../providers/payments/payments';
import IUser from '../../interfaces/IUser';

/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {
  event: IEvent;
  quantity = 1;
  constructor(public payment: PaymentsProvider, public payPal: PayPal, public navCtrl: NavController, public navParams: NavParams, public eventService: EventsProvider, public toastCtrl: ToastController, public alert: AlertController) {
    this.event = this.navParams.data;
    console.log(this.event);
  }

  ionViewDidLoad() {
  }

  delete() {

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
            this.executeOrder66();
          }
        }
      ]
    });

    del.present();
  }

  executeOrder66() {
    this.eventService.removeEvent(this.event.id).subscribe(
      ok => this.navCtrl.parent.parent.pop(),
      err => {
        console.log(err);
        this.toastCtrl.create({
          message: 'Error deleting events, perhaps someone already bought tickets?',
          duration: 5000,
        }).present()
      },
      () => console.log('finished deleting')
    );
  }

  pagameRar() {
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'AdEGr1gPJfrPCZDrQGFJ7t5AefH-NfQVQao-FufdKDzRZpnJ2R7K2HmldMy3D4DGXMGgFiA8Z-NNTNT6'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment( '' + (this.event.price * this.quantity), 'EUR', 'Purchasing ' + this.quantity + ' tickets for ' + this.event.title, 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
         
          this.payment.purcharse(this.event.id, {quantity: this.quantity}).subscribe(
            (done: IUser) => {
              
              this.toastCtrl.create({
                message: 'Payment Sucefull',
                duration: 5000,
              }).present();
              
            },
            (error) => this.toastCtrl.create({
              message: 'Error submiting the fee',
              duration: 5000,
            }).present()
          );


        }, () => {
          // Error or render dialog closed without being successful
          this.toastCtrl.create({
            message: 'Payment Cancelled',
            duration: 5000,
          }).present();
        });
      }, () => {
        // Error in configuration this.toastCtrl.create({
          this.toastCtrl.create({
            message: 'Error in config',
            duration: 5000,
          }).present();
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
      this.toastCtrl.create({
        message: 'Error loading paypal services',
        duration: 5000,
      }).present();
    });
  }
}

import { Injectable } from '@angular/core';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import {  AlertController, ModalController } from 'ionic-angular';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class InputDialogServiceProvider {
  modalPage;
  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider, public modalCtrl : ModalController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  public openModal(item?, index?){
    console.log('open');
    var data = { 
        modalTitle : item ? 'Edit Item' : 'Add Item',
        modalMessage : item ?  "Please edit item..." : "Please enter item...", 
        name : item ? item.name : null, 
        quantity : item ? item.quantity : null,  
        _id : item ? item._id : null,
      };
    this.modalPage = this.modalCtrl.create('ModalPage',data); 
    this.modalPage.onDidDismiss(returnedDataFromModal =>{
      if(returnedDataFromModal!=undefined){ //Save data
        if(index !== undefined){
          this.dataService.editItem(returnedDataFromModal,index);
        }else{
          this.dataService.addItem(returnedDataFromModal);
        }
      }
    });
    this.modalPage.present();
  } 




  /*showPrompt(item?, index?){
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Item' : 'Add Item',
      message: item ?  "Please edit item..." : "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log(item);
            if(index !== undefined){
              this.dataService.editItem(item,index);
            }else{
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    prompt.present();
  }*/

}

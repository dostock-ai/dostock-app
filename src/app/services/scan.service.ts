import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor() { }

  async scan() {
    let result;
    try {
      result = await BarcodeScanner.scan(); 
    } catch (error) {
      console.log('scan error: ', error);
    }
    const barcode = result?.text;
    return barcode;
  }
}

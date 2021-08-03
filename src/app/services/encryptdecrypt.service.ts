import { Injectable } from "@angular/core";
import CryptoJS from "crypto-js";
import { secreatkey } from "../constants/admin";

@Injectable({
  providedIn: "root",
})
export class EncryptdecryptService {
  key: string;
  constructor() {
    this.key = secreatkey.key;
  }

  decrypt(encryptStr) {
    encryptStr = CryptoJS.enc.Base64.parse(encryptStr);
    let encryptData = encryptStr.toString(CryptoJS.enc.Utf8);
    encryptData = JSON.parse(encryptData);
    let iv = CryptoJS.enc.Base64.parse(encryptData.iv);
    var decrypted = CryptoJS.AES.decrypt(
      encryptData.value,
      CryptoJS.enc.Base64.parse(this.key),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    return decrypted;
  }

  encrypt(data) {
    let iv = CryptoJS.lib.WordArray.random(16),
      key = CryptoJS.enc.Base64.parse(this.key);
    let options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
    let encrypted = CryptoJS.AES.encrypt(data, key, options);
    encrypted = encrypted.toString();
    iv = CryptoJS.enc.Base64.stringify(iv);
    let result = {
      iv: iv,
      value: encrypted,
      mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
    };
    let resultStringfy = JSON.stringify(result);
    let finalresult = CryptoJS.enc.Utf8.parse(resultStringfy);
    return CryptoJS.enc.Base64.stringify(result);
  }
}

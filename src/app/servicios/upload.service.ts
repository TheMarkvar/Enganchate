import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { AngularFireStorage } from 'angularfire2/storage';;

import { Upload } from '../modelos/upload';

export class UploadService {

  private path_storage:string="images/";
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event) {
    const file = event.target.files[0];
    const task = this.storage.upload(this.path_storage, file);
  }


}

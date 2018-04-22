import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class UploadService {

  private path_storage:string="images/";


  constructor(private storage: AngularFireStorage) { }

  uploadFile(event, path) {
    const file = event.target.files[0];
    const task = this.storage.upload(this.path_storage+path, file);

    return task;
  }

  downloadFile(path) {
    //const file = event.target.files[0];
    //const task = this.storage.upload(this.path_storage+path, file);
    const ref = this.storage.ref('users/davideast.jpg');
    return ref.getDownloadURL();

  }


}

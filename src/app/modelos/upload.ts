export class Upload {
  $id: string;
  file:File;
  name:string;
  url:string;
  progress:number;
  createdAt: Date = new Date();

  constructor (file:File){
    this.file = file;
  }

}

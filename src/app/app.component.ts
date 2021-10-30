import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styles: [
    `.logo {
      max-height: 30px;
      padding-bottom: 5px;
    }`
  ]
})
export class AppComponent  {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService,
              private http: HttpClient) {}

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

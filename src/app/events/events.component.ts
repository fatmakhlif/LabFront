import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleFormDialogComponent } from './../article-form-dialog/article-form-dialog.component';
import { Router } from '@angular/router';
import { Events } from './../../models/Evt';
import { EvenementService } from './../../services/evenement.service';
import { MatDialog  } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable } from 'rxjs';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  dataSourceevent:Events[] ;
  closeResult: string="";
  content: any ;
  form : any ;
  itemGlobal : any ;

  constructor(private eventservice : EvenementService,private router : Router , private dialog : MatDialog ,     private modalService: NgbModal,
    ) {
   this.dataSourceevent = this.eventservice.tab3;
   }

   ngOnInit(): void {
    this.fetchData();

    this.form = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'titre': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      'lieu': new FormControl(null, Validators.required),
      
     
    });
  }
  title = 'FirstAppAngular';
  sideBarOpen = false;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  ONDelete(id : string) : void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{});
    // nestana fel after closed 
    dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.eventservice.RemoveEventById(id).then(()=>{this.fetchData() ;})}}) ;
    
  }

   
    fetchData() : void
  {
    this.eventservice.GetALL().then((tableau: any)=>{this.dataSourceevent=tableau;})
  } 
  resetFormValues(){
  //this.form.get('id').setValue(null);
  this.form.get('titre').setValue(null);
  this.form.get('lieu').setValue(null);
  this.form.get('date').setValue(null);
 // this.form.get('id').setValue(null);

  }
  modifyFormValues(item : Events){
   // this.form.get('id').setValue(item.id);
  this.form.get('titre').setValue(item.titre);
  this.form.get('lieu').setValue(item.lieu);
  this.form.get('date').setValue(item.date);
  //this.form.get('id').setValue(item.id);
 
  }
  open(content : any) {
   this.resetFormValues();   
   
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openformtoedit(content : any , id : string) {
    this.eventservice.getEventById(id).then((item)=>{this.modifyFormValues(item);
      this.itemGlobal=item ;
    })
     this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ONSUB():void {
 console.log(this.form.value);
    this.eventservice.saveEvents(this.form.value).then(()=>{ this.fetchData() ;   } ) ;
  


}
ONEDIT(): void {

  const objectToSubmit = {...this.itemGlobal ,...this.form.value} 
    this.eventservice.saveEvents(objectToSubmit).then(()=>{this.fetchData() ;}) ;

}

}

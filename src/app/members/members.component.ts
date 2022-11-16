import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
//import {GLOBAL1} from 'C:/Users/pc/angular/FirstAppAngular/src/app/app-config';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  dataSource:Member[] ;
  closeResult: string="";
  form : any ;
  itemGlobal : any ;
  



  constructor(private memberService : MemberService ,private router : Router , private dialog : MatDialog , private modalService: NgbModal ) {

    this.dataSource =   this.memberService.tab ;}
    

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'cv': new FormControl(null, Validators.required),
      'cin': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'createdDate': new FormControl(null, Validators.required),
      
     
    });

  }
   //dataSource : Member [] =  this.memberService.tab ;
  fetchData() : void
  {
     this.memberService.getAllMembers().then((tableau)=>{this.dataSource=tableau})
  }

   ONDelete(id : string) : void {

    //ouvrir boite 
    // attendre le retour d'utilsiateur 
    // si oui on supprime 
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{});
    // nestana fel after closed 
    dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.memberService.deleteMemberById(id).then(()=>{this.fetchData() ;}) 
    }})
    
    ;}

    // applyFilter(event: Event) {
      //   const filterValue = (event.target as HTMLInputElement).value;
      //   this.dataSource.filter = filterValue.trim().toLowerCase();
      // }
      resetFormValues(){
       this.form.get('cin').setValue(null);
       this.form.get('type').setValue(null);
       this.form.get('cv').setValue(null);
       this.form.get('name').setValue(null);
      
     
       }
       modifyFormValues(item : Member){
         this.form.get('cin').setValue(item.cin);
       this.form.get('cv').setValue(item.cv);
       this.form.get('type').setValue(item.type);
       this.form.get('name').setValue(item.name);
      
     
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
        this.memberService.getMemberByid(id).then((item)=>{this.modifyFormValues(item);
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

        this.memberService.saveMember(this.form.value).then(()=>{ this.fetchData() ;   } ) ;
      
    
    
    }
    ONEDIT(): void {
    
      const objectToSubmit = {...this.itemGlobal ,...this.form.value} 
        this.memberService.saveMember(objectToSubmit).then(()=>{this.fetchData() ;}) ;
    
    }
     
    



  }


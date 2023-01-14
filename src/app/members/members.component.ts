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

 // dataSource:Member[] ;
 displayedColumns: string[] = ['ID', 'CIN', 'NAME' , 'CREATEDDATE' , 'CV' , 'TYPE' ,  'DATE','UR'  ];

 dataSource : MatTableDataSource<Member>

  closeResult: string="";
  form : any ;
  form2 : any ;
  itemGlobal : any ;
  



  constructor(private memberService : MemberService ,private router : Router , private dialog : MatDialog , private modalService: NgbModal ) {
    this.dataSource = new MatTableDataSource(this.memberService.tab);

  //  this.dataSource =   this.memberService.tab ;
}
    

  ngOnInit(): void {
    this.fetchData();

    this.form = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'cv': new FormControl(null, Validators.required),
      'cin': new FormControl(null, Validators.required),
      'nom': new FormControl(null, Validators.required),
      'prenom': new FormControl(null, Validators.required),

      'email': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      
     
    });
    this.form2 = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'cv': new FormControl(null, Validators.required),
      'cin': new FormControl(null, Validators.required),
      'nom': new FormControl(null, Validators.required),
      'prenom': new FormControl(null, Validators.required),

      'email': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),
      
     
    });

  }
  title = 'FirstAppAngular';
  sideBarOpen = false;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
   //dataSource : Member [] =  this.memberService.tab ;
  fetchData() : void
  {
     this.memberService.getAllMembers().then((tableau)=>{this.dataSource.data=tableau})
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      resetFormValues(){
       this.form2.get('cin').setValue(null);
       this.form2.get('email').setValue(null);
       this.form2.get('cv').setValue(null);
       this.form2.get('nom').setValue(null);
       this.form2.get('prenom').setValue(null);
       
      
     
       }
       modifyFormValues(item : Member){
         this.form2.get('cin').setValue(item.cin);
       this.form2.get('cv').setValue(item.cv);
       this.form2.get('email').setValue(item.email);
       this.form2.get('nom').setValue(item.nom);
       this.form2.get('prenom').setValue(item.prenom);

      
     
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
          console.log(item);
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
    
         console.log(this.form2.value);
        //this.memberService.saveMember(objectToSubmit).then(()=>{this.fetchData() ;}) ;
        this.memberService.EditMember(2 ,this.form2.value).then(()=>{this.fetchData() ;}) ;
    
    }
     
    



  }


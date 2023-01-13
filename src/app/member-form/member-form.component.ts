import { Member } from './../../models/Member';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  form : any ;
  currentID : any ;
  itemGlobal : any ;
 
//injecter le service ds le constructure du component
  constructor(private MemberService : MemberService , private router :Router  ,private ActivatedRouter : ActivatedRoute ) { }

  ngOnInit(): void {
    //recuperer l element a partir du url 
    this.currentID=this.ActivatedRouter.snapshot.params.id ;   
    //console.log(this.currentID);
     //recuper l element a partir de lid
     // si la variable existe o 3andha valeur truly 
     if(!!this.currentID){
       
       this.MemberService.getMemberByid(this.currentID).then((item)=>{
        this.itemGlobal =item ;
        this.initForm1(item);
       })
      } 
      else{
        this.initForm();
      }
    
  }
  initForm():void {
    this.form =  new FormGroup ({
      cin : new FormControl (null , [Validators.required]),
      nom : new FormControl (null , [Validators.required]),
      prenom : new FormControl (null , [Validators.required]),

      cv : new FormControl (null , [Validators.required]),
      email : new FormControl (null , [Validators.required]),


    })

  }
 
  initForm1(item : Member):void {
    this.form =  new FormGroup ({
      cin : new FormControl (item.cin),
      nom : new FormControl (item.nom),
      prenom : new FormControl (item.prenom),

      cv : new FormControl (item.cv),
      email : new FormControl (item.email),


    })

  }
  
  ONSUB():void {

   const objectToSubmit = {...this.itemGlobal ,...this.form.value} 
    this.MemberService.saveMember(objectToSubmit).then(()=>{this.router.navigate(['./members'])}) ;
    //then : ki jeni l retour chnou bch na3mel ? 
    
    //thread dinamou du web 
    // this.instanceclassservice.methodeservice.then((eli jeni )=>{retour})
  }
 

}

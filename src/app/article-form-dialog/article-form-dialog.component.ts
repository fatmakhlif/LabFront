import { Article } from './../../models/Article';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-article-form-dialog',
  templateUrl: './article-form-dialog.component.html',
  styleUrls: ['./article-form-dialog.component.scss']
})
export class ArticleFormDialogComponent implements OnInit {
  form : any ;
  currentID : any ;
  itemGlobal : any ;
 
//injecter le service ds le constructure du component
  constructor(private articleService : ArticleService , private router :Router  , private ActivatedRouter : ActivatedRoute ,public dialogRef: MatDialogRef<ArticleFormDialogComponent> ) { }

  ngOnInit(): void {
    //recuperer l element a partir du url 
    this.currentID=this.ActivatedRouter.snapshot.params.id ;   
    //console.log(this.currentID);
     //recuper l element a partir de lid
     // si la variable existe o 3andha valeur truly 
     if(!!this.currentID){
       
       this.articleService.getArticleByid(this.currentID).then((item)=>{
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
      id : new FormControl (null , [Validators.required]),
      type : new FormControl (null , [Validators.required]),
      title : new FormControl (null , [Validators.required]),
      Date : new FormControl (null , [Validators.required]),
      lien : new FormControl (null , [Validators.required]),
      auteur : new FormControl (null , [Validators.required]),
      SourcePdf : new FormControl (null , [Validators.required]),


    })

  }
  initForm1(item : Article):void {
    this.form =  new FormGroup ({
      id : new FormControl (item.id),
      type : new FormControl (item.type),
      title : new FormControl (item.title),
      Date : new FormControl (item.Date),
      lien : new FormControl (item.lien),
      auteur : new FormControl (item.auteur),
      SourcePdf : new FormControl (item.SourcePdf),



    })

  }
  ONSUB():void {
   
   const objectToSubmit = {...this.itemGlobal ,...this.form.value} 
    this.articleService.saveArticle(objectToSubmit).then(()=>{this.router.navigate(['./articles'])}) ;
    //then : ki jeni l retour chnou bch na3mel ? 
    
    //thread dinamou du web 
    // this.instanceclassservice.methodeservice.then((eli jeni )=>{retour})
    this.dialogRef.close(this.form.value);
  }


close() {
    this.dialogRef.close();
}
 

}

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleFormDialogComponent } from './../article-form-dialog/article-form-dialog.component';
import { Router } from '@angular/router';
import { Publication } from './../../models/Article';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog  } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable } from 'rxjs';
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  dataSourcearticle:Publication[] ;
  closeResult: string="";
  content: any ;
  form : any ;
  itemGlobal : any ;

  constructor(private articleService : ArticleService,private router : Router , private dialog : MatDialog ,     private modalService: NgbModal,
    ) {
   this.dataSourcearticle = this.articleService.tab;
   }

  ngOnInit(): void {
    this.fetchData();

    this.form = new FormGroup({
      'id': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'lien': new FormControl(null, Validators.required),
      'sourcePdf': new FormControl(null, Validators.required),
      'auteur': new FormControl(null, Validators.required),
      'date': new FormControl(null, Validators.required),

     
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
    dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.articleService.deleteArticleById(id).then(()=>{this.fetchData() ;})}}) ;
    
  }

   
    fetchData() : void
  {
    this.articleService.getAllArticles().then((tableau: any)=>{this.dataSourcearticle=tableau;})
  } 
  resetFormValues(){
  //this.form.get('id').setValue(null);
  this.form.get('title').setValue(null);
  this.form.get('type').setValue(null);
  this.form.get('auteur').setValue(null);
  this.form.get('sourcePdf').setValue(null);
  this.form.get('lien').setValue(null);
  this.form.get('date').setValue(null);

  }
  modifyFormValues(item : Publication){
   // this.form.get('id').setValue(item.id);
  this.form.get('title').setValue(item.title);
  this.form.get('type').setValue(item.type);
  this.form.get('auteur').setValue(item.auteur);
  this.form.get('sourcePdf').setValue(item.sourcePdf);
  this.form.get('lien').setValue(item.lien);
  this.form.get('date').setValue(item.date);

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
    this.articleService.getArticleByid(id).then((item)=>{this.modifyFormValues(item);
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

    this.articleService.saveArticle(this.form.value).then(()=>{ this.fetchData() ;   } ) ;
  


}
ONEDIT(): void {

  const objectToSubmit = {...this.itemGlobal ,...this.form.value} 
    this.articleService.saveArticle(objectToSubmit).then(()=>{this.fetchData() ;}) ;

}
}

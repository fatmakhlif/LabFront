import { ArticleFormDialogComponent } from './../article-form-dialog/article-form-dialog.component';
import { Router } from '@angular/router';
import { Article } from './../../models/Article';
import { ArticleService } from './../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'title', 'lien', 'SourcePDF','Date','auteur','cc'];
  dataSourcearticle:any ;
  constructor(private articleService : ArticleService,private router : Router , private dialog : MatDialog) {
   this.dataSourcearticle = new MatTableDataSource(this.articleService.tab);
   }

  ngOnInit(): void {
  }
  ONDelete(id : string) : void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{});
    // nestana fel after closed 
    dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.articleService.deleteArticleById(id).then(()=>{this.fetchData() ;})}}) ;
    
  }

   
    fetchData() : void
  {
    this.articleService.getAllArticles().then((tableau: any)=>{this.dataSourcearticle.data=tableau;})
  } 
  ONEdit(id : string) : void {

    const dialogRef = this.dialog.open(ArticleFormDialogComponent,{});
    // nestana fel after closed 
    //   dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.articleService.saveArticle(objectToSubmit).then(()=>{this.router.navigate(['./articles'])}) ;}}) ;
    
  }


}

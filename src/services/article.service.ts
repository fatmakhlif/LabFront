import { HttpClient } from '@angular/common/http';
import { Article } from './../models/Article';
import { Injectable } from '@angular/core';
import { GLOBAL1 } from './../app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab : Article[] = GLOBAL1._DB1.articles ;
  idArticle : string ="";
  
  constructor(private httpClient : HttpClient) { }
  
  deleteArticleById(id : string) : Promise<void>
  {
    //this.httpClient.delete<void>('adresseapi').toPromise();
    //forcage de type (toPromise)  
    this.tab = [...this.tab.filter(item=> item.id!== id)] ;
    
    return ( new Promise (resolve=> resolve()) )
    
  }
  getAllArticles() : Promise <Article []>
  {
    //this.httpClient.get<Member[]>('link').toPromise();
    return new Promise (resolve => resolve (this.tab))
  }
  
  getArticleByid(id : string) : Promise<Article>
  { 
    // this.httpClient.get<Member>('adresseipduback').toPromise();
    
    //resolve = bloc try  == si on n'a pas d'erruer  
    //louken l9a [0] y7outou sinon null > ?? == null 
    return ( new Promise (resolve => resolve(this.tab.filter(item => item.id===id ) [0] ?? null)))
  }

  saveArticle(article: any) :  Promise<Article>
  {
    // this.httpClient.post<Member>('linktoRestAPI127..222', member).toPromise()
    //req http t7el thread fel front o t7outou en ecoute lel les echanges eli ysirou fel back kima mail makhdoum bel observable
    const articleNew = {
      ...article,
      id:article.id?? Math.ceil(Math.random()*10000).toString(),
      Date :article.Date ?? new Date().toISOString(),
    } 
    this.tab = [articleNew,...this.tab.filter(item => item.id!=articleNew.id)];
    return(new Promise(resolve =>resolve(articleNew)))
    //resolve => bloc try 
  }
  affectAuteur(id_article :string, selected :string ) : Promise<void> {
    
   this.getArticleByid(id_article).then((article)=>{article.auteur = selected});
    
    
    return new Promise (resolve => resolve ())
    
  }
  
  

}

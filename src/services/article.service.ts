import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/Article';
import { Injectable } from '@angular/core';
import { GLOBAL1 } from '../app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab : Publication[] =[] ;
  idArticle : string ="";
  
  constructor(private httpClient : HttpClient) { }
  
  deleteArticleById(id : string) : Promise<void>
  {
    return (this.httpClient.delete<void>('http://localhost:9000/PUBLICATION-SERVICE/publications/'+id).toPromise())
    //forcage de type (toPromise)  
    //this.tab = [...this.tab.filter(item=> item.id!== id)] ;
    
    //return ( new Promise (resolve=> resolve()) )
    
  }
  getAllArticles() : Promise <Publication []>
  {
    return (this.httpClient.get<Publication[]>('http://localhost:9000/PUBLICATION-SERVICE/publications').toPromise())
    //return new Promise (resolve => resolve (this.tab))
  }
  
  getArticleByid(id : string) : Promise<Publication>
  { 
    return( this.httpClient.get<Publication>('http://localhost:9000/PUBLICATION-SERVICE/publication/'+id).toPromise())
    
    //resolve = bloc try  == si on n'a pas d'erruer  
    //louken l9a [0] y7outou sinon null > ?? == null 
    //return ( new Promise (resolve => resolve(this.tab.filter(item => item.id===id ) [0] ?? null)))
  }

  saveArticle(article: any) :  Promise<Publication>
  {
    return( this.httpClient.post<Publication>('http://localhost:9000/PUBLICATION-SERVICE/publication', article).toPromise() );
    //req http t7el thread fel front o t7outou en ecoute lel les echanges eli ysirou fel back kima mail makhdoum bel observable
    // const articleNew = {
    //   ...article,
    //   id:article.id?? Math.ceil(Math.random()*10000).toString(),
    //   Date :article.Date ?? new Date().toISOString(),
    // } 
    // this.tab = [articleNew,...this.tab.filter(item => item.id!=articleNew.id)];
    // return(new Promise(resolve =>resolve(articleNew)))
    //resolve => bloc try 
  }
  affectAuteur(id_article :string, selected :string ) : Promise<void> {
    
   return (this.getArticleByid(id_article).then((article)=>{article.auteur = selected}))
    
    
    //return new Promise (resolve => resolve ())
   // return(this.httpClient.get<void>('http://localhost:9000/MEMBRE-SERVICE/affecterAuteurToPub/' + id_article +'/' +selected).toPromise())
    
  }
  
  

}

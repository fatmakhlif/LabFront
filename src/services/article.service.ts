import { HttpClient } from '@angular/common/http';
import { Article } from './../models/Article';
import { Injectable } from '@angular/core';
import { GLOBAL1 } from './../app/app-config';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab : Article[] = GLOBAL1._DB1.articles ;

  constructor(private httpClient : HttpClient) { }

  deleteArticleById(id : string) : Promise<void>
  {
    this.httpClient.delete<void>('adresseapi').toPromise();
    //forcage de type (toPromise) || void == type de retour 
     this.tab = [...this.tab.filter(item=> item.id!== id)] ;
    
     return ( new Promise (resolve=> resolve()) )

  }
  getAllArticles() : Promise <Article []>
  {
    //this.httpClient.get<Member[]>('link').toPromise();
    return new Promise (resolve => resolve (this.tab))
  }


}

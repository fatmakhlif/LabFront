import { GLOBAL1 } from './../app/app-config';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from 'src/models/Member';
import { isNgTemplate } from '@angular/compiler';
//injection de dep ( 3andi 7a9 nesta3ml service fel composant )
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  public tab :Member[] = GLOBAL1._DB1.members ;
  constructor(private httpClient : HttpClient) { }
  saveMember(member: any) :  Promise<Member>
  {
  // this.httpClient.post<Member>('linktoRestAPI127..222', member).toPromise()
   //req http t7el thread fel front o t7outou en ecoute lel les echanges eli ysirou fel back kima mail makhdoum bel observable
   const memberNew = {
  ...member,
  id:member.id?? Math.ceil(Math.random()*10000).toString(),
  createdDate :member.createdDate ?? new Date().toISOString(),
     } 
     this.tab = [memberNew,...this.tab.filter(item => item.id!=memberNew.id)];
    return(new Promise(resolve =>resolve(memberNew)))
    //resolve => bloc try 
  }
  getMemberByid(id : string) : Promise<Member>
  { 
   // this.httpClient.get<Member>('adresseipduback').toPromise();
  
    //resolve = bloc try  == si on n'a pas d'erruer  
    //louken l9a [0] y7outou sinon null > ?? == null 
    return ( new Promise (resolve => resolve(this.tab.filter(item => item.id===id ) [0] ?? null)))
  }
  deleteMemberById(id : string) : Promise<void>
  {
    //this.httpClient.delete<void>('adresseapi').toPromise();
    //forcage de type (toPromise) || void == type de retour 
     this.tab = [...this.tab.filter(item=> item.id!== id)] ;
    
     return ( new Promise (resolve=> resolve()) )

  }
  getAllMembers() : Promise <Member []>
  {
    //this.httpClient.get<Member[]>('link').toPromise();
    return new Promise (resolve => resolve (this.tab))
  }


  

}

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

  public tab :Member[] = [];
  constructor(private httpClient : HttpClient) { }
  saveMember(member: any) :  Promise<Member>
  {
  return ( this.httpClient.post<Member>('http://localhost:9000/MEMBRE-SERVICE/membres/etudiant', member).toPromise() )
   //req http t7el thread fel front o t7outou en ecoute lel les echanges eli ysirou fel back kima mail makhdoum bel observable
   // memberNew = {
//...member,
  //:member.id?? Math.ceil(Math.random()*10000).toString(),
  //date :member.date ?? new Date().toISOString(),
//} 
     //this.tab = [memberNew,...this.tab.filter(item => item.id!=memberNew.id)];
    //return(new Promise(resolve =>resolve(memberNew)))
    //resolve => bloc try 
  }
  getMemberByid(id : string) : Promise<Member>
  { 
   return(this.httpClient.get<Member>('http://localhost:9000/MEMBRE-SERVICE/membre/'+id ).toPromise())
  
    //resolve = bloc try  == si on n'a pas d'erruer  
    //louken l9a [0] y7outou sinon null > ?? == null 
   // return ( new Promise (resolve => resolve(this.tab.filter(item => item.id===id ) [0] ?? null)))
  }
  deleteMemberById(id : string) : Promise<void>
  {
    
    //forcage de type (toPromise) || void == type de retour 
    // this.tab = [...this.tab.filter(item=> item.id!== id)] ;
    
     return (this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/membres/' + id ).toPromise())
     //( new Promise (resolve=> resolve()) )

  }
  getAllMembers() : Promise <Member []>
  {
    //
    return (this.httpClient.get<Member[]>('http://localhost:9000/MEMBRE-SERVICE/membres').toPromise()) 
    //new Promise (resolve => resolve (this.tab))
  }
  EditMember(id: any, member: Member): Promise<Member> {
    return this.httpClient.put<Member>('http://localhost:9000/MEMBRE-SERVICE/membres/etudiant/' + id, member).toPromise();


  }

  

}

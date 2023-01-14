import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'src/models/Evt';


@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  public tab3: Events[] = [];
  constructor(private httpClient: HttpClient) { }
  getEventById(id: string): Promise<Events> {
    return this.httpClient.get<Events>('http://localhost:9000/EVENEMENT-SERVICE/evenementt/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }
  RemoveEventById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:9000/EVENEMENT-SERVICE/evenement/' + id).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }
  GetALL(): Promise<Events[]> {
    return this.httpClient.get<any[]>('http://localhost:9000/EVENEMENT-SERVICE/evenements').toPromise();

  }
  saveEvents(event: any): Promise<Events> {
    return this.httpClient.post<Events>('http://localhost:9000/EVENEMENT-SERVICE/evenement', event).toPromise();

  }

}

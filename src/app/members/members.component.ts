import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
//import {GLOBAL1} from 'C:/Users/pc/angular/FirstAppAngular/src/app/app-config';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  dataSource!:MatTableDataSource<Member> ;

  constructor(private memberService : MemberService ,private router : Router , private dialog : MatDialog ) {

    this.dataSource =   new MatTableDataSource(this.memberService.tab) ;}
    

  ngOnInit(): void {

  }
   //dataSource : Member [] =  this.memberService.tab ;
   displayedColumns: string[] = ['id', 'cin', 'name', 'createdDate', 'cv','type','cc'];
  fetchData() : void
  {
     this.memberService.getAllMembers().then((tableau)=>{this.dataSource.data=tableau})
  }

   ONDelete(id : string) : void {

    //ouvrir boite 
    // attendre le retour d'utilsiateur 
    // si oui on supprime 
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{});
    // nestana fel after closed 
    dialogRef.afterClosed().subscribe(resultat=>{if (resultat) {this.memberService.deleteMemberById(id).then(()=>{this.fetchData() ;}) 
    }})
    
    ;}

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
     
    



  }


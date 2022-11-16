import { ArticleService } from './../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from './../../services/member.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/models/Member';

@Component({
  selector: 'app-affect',
  templateUrl: './affect.component.html',
  styleUrls: ['./affect.component.scss']
})
export class AffectComponent implements OnInit {
  
   tab : Member[];
   selected : string ="";
   id_article: string  ="";


  constructor(private memberService : MemberService ,private articleService : ArticleService , private ActivatedRoute : ActivatedRoute ,private router : Router) {
    this.tab=this.memberService.tab ;
   }

  ngOnInit(): void {
  }

  affect(selected : string): void {

    this.id_article = this.ActivatedRoute.snapshot.params.id ;
    this.articleService.affectAuteur(this.id_article , selected).then(()=>{this.router.navigate(['/articles'])}) ;

  }

  

}

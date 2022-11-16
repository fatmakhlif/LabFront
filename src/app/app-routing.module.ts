import { LoginComponent } from './login/login.component';
import { AffectComponent } from './affect/affect.component';
import { ArticlesComponent } from './articles/articles.component';
import { ToolsComponent } from './tools/tools.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MembersComponent } from './members/members.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"", pathMatch:'full', redirectTo:'login' },
  { path :'members' ,pathMatch: 'full',component:MembersComponent},
  { path : 'create',pathMatch: 'full',component:MemberFormComponent},
  { path : 'articles',pathMatch: 'full',component:ArticlesComponent},
  { path : 'tools',pathMatch: 'full',component:ToolsComponent},
  { path : 'Events',pathMatch: 'full',component:EventsComponent},
  { path : 'members/:id/edit',pathMatch: 'full',component:MemberFormComponent},
  { path : 'articles/:id/affect',pathMatch: 'full',component:AffectComponent},
  { path : 'login',pathMatch: 'full',component:LoginComponent},
  { path : 'dashboard',pathMatch: 'full',component:DashboardComponent},


  
   {path:"**", pathMatch:'full', redirectTo:'members' },
   //Dashboard component 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }

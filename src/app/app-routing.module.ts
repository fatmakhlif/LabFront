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
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {path:"", pathMatch:'full', redirectTo:'login' },
  { path :'members' ,pathMatch: 'full',component:MembersComponent, canActivate : [AuthorizationGuard]},
  { path : 'create',pathMatch: 'full',component:MemberFormComponent, canActivate : [AuthorizationGuard]},
  { path : 'articles',pathMatch: 'full',component:ArticlesComponent, canActivate : [AuthorizationGuard]},
  { path : 'tools',pathMatch: 'full',component:ToolsComponent, canActivate : [AuthorizationGuard]},
  { path : 'Events',pathMatch: 'full',component:EventsComponent, canActivate : [AuthorizationGuard]},
  { path : 'members/:id/edit',pathMatch: 'full',component:MemberFormComponent, canActivate : [AuthorizationGuard]},
  { path : 'articles/:id/affect',pathMatch: 'full',component:AffectComponent, canActivate : [AuthorizationGuard]},
  { path : 'login',pathMatch: 'full',component:LoginComponent},
  { path : 'dashboard',pathMatch: 'full',component:DashboardComponent, canActivate : [AuthorizationGuard]},


  
   {path:"**", pathMatch:'full', redirectTo:'members' },
   //Dashboard component 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }

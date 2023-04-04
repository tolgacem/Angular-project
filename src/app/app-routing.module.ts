import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { CsequenceComponent } from './csequence/csequence.component';


const routes: Route[] = [
  {path:'about', component : AboutComponent},
  {path:'header', component : HeaderComponent},
  {path:'csequence', component : CsequenceComponent}  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

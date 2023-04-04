import { Component } from '@angular/core';
import { Todo, UserService}  from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor(
    private userService: UserService
  ){}

  users: any = null;
  
  listData = new Array();
  
    TodoList:Todo[] = [];

  get_about_xrefs(var_species:string,var_symbol:string){
    this.userService.get_xrefs(var_species,var_symbol)
    .subscribe( res => {
      this.users =  JSON.stringify(res);
      this.TodoList = res; 
      //this.TodoList = this.TodoList[0];
      //console.warn(this.TodoList[0].id)
      this.listData.push(this.users) 
    },
    (error) => {
      alert("No value")
    })
  }

  dispBoxVal:string='';
  get_about_xrefs_BoxValue(var_species:string,var_symbol:string){
    this.get_about_xrefs(var_species,var_symbol); 
  }
  
}

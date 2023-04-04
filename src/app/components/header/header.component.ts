import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService}  from 'src/app/services/user.service';
import * as jsdiff from 'diff';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit{

  str1:string = 'beep boop';
  str2:string = 'beep boob blah';
  text_result:string = '';

  title: string = 'Ornek Proje';

  users: any = null;
  
  listData = new Array();

  data = {
    pendings_x : []
  }

  getItems(){
      this.listData = Array(JSON.parse(localStorage.getItem('listData') || '{}'));
  }   
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
      //this.getUsers_1('ENSG00000157764');
      //localStorage.removeItem('listData')
      //this.listData = JSON.parse(localStorage.getItem('listData') || '{}');
      //this.getItems();
  }

  
  url_val:string = '';
  getUsers_1(url_val:string){
    this.userService.getUsers(url_val)
    .subscribe( res => {
      //console.log(res);
      this.users =  res; 
      //this.dataSource = new Array(this.users)
      //this.getItems()
      this.listData.push(this.users) 
      //this.listData = this.users
      //localStorage.setItem('listData', JSON.stringify(this.listData))
    })
  }

  dispBoxVal:string='';
  getBoxValue(val:string){
    //console.warn(val)
    this.dispBoxVal = val;
    this.getUsers_1(val);
  }


  dataSource : any;
  displayedColumns: string[] = ['version', 'latest', 'is_current', 'peptide', 'release', 'id', 'type', 'assembly', 'possible_replacement'];
}

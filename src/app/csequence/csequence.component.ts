import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService}  from 'src/app/services/user.service';
import * as jsdiff from 'diff';

export interface MyObj {
    "molecule": string;
    "version" : string;
    "desc": string;
    "id": string;
    "seq": string;
    "query": string;
}

@Component({
  selector: 'app-csequence',
  templateUrl: './csequence.component.html',
  styleUrls: ['./csequence.component.scss']
})
export class CsequenceComponent {


  str1:string = 'beep boop';
  str2:string = 'beep boob blah';
  text_result:string = '';

  title: string = 'Ornek Proje';

  result_1: any = null!;
  result_2: any = null!;
  result_3: any = null!;

  listData1 = new Array();
  listData2 = new Array();
  listData3 = new Array();
  data = {
    pendings_x : []
  }
/*
  getItems(){
      this.listData = Array(JSON.parse(localStorage.getItem('listData') || '{}'));
  } */  
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
      //this.getUsers_1('ENSG00000157764');
      //localStorage.removeItem('listData')
      //this.listData = JSON.parse(localStorage.getItem('listData') || '{}');
      //this.getItems();
  }

  json_seq1:string = '';
  json_seq2:string = '';
  json_seq3:string = '';

  url_val:string = '';
  url_val1:string = '';
  url_val2:string = '';

  getUsers_1(url_val1:string, url_val2:string){
    this.userService.get_sequence(url_val1)
    .subscribe( res => {
      console.log(res);
      this.result_1 =  res; 
      //this.dataSource = new Array(this.users)
      //this.getItems()
      this.listData1.push(this.result_1) 
      //this.listData = this.users
      //localStorage.setItem('listData', JSON.stringify(this.listData))
      this.json_seq1 = JSON.stringify(this.result_1);
    })

    this.userService.get_sequence(url_val2)
    .subscribe( res => {
      console.log(res);
      this.result_2 =  res; 
      //this.dataSource = new Array(this.users)
      //this.getItems()
      this.listData2.push(this.result_2) 
      //this.listData = this.users
      //localStorage.setItem('listData', JSON.stringify(this.listData))
      this.json_seq2 = JSON.stringify(this.result_2);
      
      
    })

    let obj : MyObj = JSON.parse(this.json_seq1);
    let obj2 : MyObj = JSON.parse(this.json_seq2);
    this.func_diff(obj.seq, obj2.seq);

    //let span = null;

    //const display = document.getElementById('display')!;


    
    //display.append(this.json_seq1);
    //display.append(this.json_seq2);

    /*
    console.log("molecule " + obj.molecule);
    console.log("dna " + obj.dna);
    console.log("version " + obj.version);
    console.log("desc " + obj.desc);
    console.log("id " + obj.id);
    console.log("seq " + obj.seq);
    console.log("query " + obj.query);
    */
    //this.func_diff(this.listData1.seq, );

    
  
  }

  dispBoxVal1:string='';
  dispBoxVal2:string='';
  getBoxValue(val1:string){
    //console.warn(val)
    this.dispBoxVal1 = val1;
    //this.dispBoxVal2 = val1;
    //this.getUsers_1(val1, val2);
    this.f_search(val1);
  } 


  dataSource : any;
  displayedColumns: string[] = ['version', 'latest', 'is_current', 'peptide', 'release', 'id', 'type', 'assembly', 'possible_replacement'];

  
  f_search(input:string){

    for (let i = 0; i < 8; i++) 
    {
      console.log ("Block statement execution no." + i);
    
    
      let url_val3 = ["ENSE00001154485","ENSG00000248378","ENSE00001154487","ENSE00001154490","ENSE00001154491","ENSE00001154494","ENSG00000157765","ENSG00000157766"];
      console.log(url_val3[i]);
      this.userService.get_sequence(url_val3[i])
      .subscribe( res => {
        console.log(res);
        this.result_3 =  res; 
        //this.dataSource = new Array(this.users)
        //this.getItems()
        this.listData3.push(this.result_3) 
        //this.listData = this.users
        //localStorage.setItem('listData', JSON.stringify(this.listData))
        this.json_seq3 = JSON.stringify(this.result_3);
      })

      let obj3 : MyObj = JSON.parse(this.json_seq3);
      //this.func_diff(obj.seq, obj2.seq);
      if(obj3.seq.indexOf(input) !== -1)
      {
        console.log("oldu -------------------");
        this.compareStrings(obj3.seq,input);
        document.getElementById("display_i")!.innerHTML = obj3.id
        document.getElementById("display_d")!.innerHTML = obj3.desc
        document.getElementById("display_m")!.innerHTML = obj3.molecule
        document.getElementById("display_s")!.innerHTML = obj3.seq
        break;
      }
      else
      {  
        console.log("olmadı -------------------");
        //this.json_seq3 ="";
        //this.result_3="";
      }
    }
  }

  compareStrings(string1:string, string2:string) {
    let results = jsdiff.diffWords(string1, string2);
  
    let output = "";
    console.log(results.length);
    
    results.forEach((item) => {
      console.log("kac kere results.length");
      
      if (item.added) { // ortağı boya
        output += `<span style="background-color:yellow">${item.value }</span>`;
        //output += `<span> </span>`;
      } else if (item.removed) { 
          //output += `${item.value}`;
      }
    });


    document.getElementById("display")!.innerHTML = output
  }

  func_diff(str1:string, str2:string)
  {
    //let str1:string = 'TGAAABTCCCCCCCCCCCCCCCCCCCCCCCC';
    //let str2:string = 'ABTGCBTGAAABTTGABCTABTGTATAABCT';
    let arr_str1: string[];
    let arr_str2: string[];
    arr_str1 = Array.from(str1);
    arr_str2 = Array.from(str2);

    let span = null;

    const diff = jsdiff.diffWords(str1, str2),
    display = document.getElementById('display')!,
    fragment = document.createDocumentFragment();

    let oldH3Element =  document.querySelector('display')
    if(oldH3Element) oldH3Element.removeChild(oldH3Element)

    diff.forEach((part) => {
      // grey for additions, red for deletions
      // green for common parts
      const color = part.added ? 'black' : part.removed ? 'red' : 'green';
      span = document.createElement('span');
      span.style.color = color; 
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    });

    
    display.appendChild(fragment);
  }
}

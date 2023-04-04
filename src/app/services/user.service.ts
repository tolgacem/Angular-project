import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo{
  // "type":"gene","id":"ENSG00000157764"},{"id":"LRG_299","type":"gene"
  id:string,
  type:string
  
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
 
  
  constructor(
    private http: HttpClient
  ) { }

  apiurl:string='';
  getUsers(url_val:string){
    this.apiurl = 'https://rest.ensembl.org/archive/id/'+url_val+ '?content-type=application/json';  //'https://jsonplaceholder.typicode.com/';
    return this.http.get(this.apiurl);
  }

  //GET xrefs/symbol/:species/:symbol
  get_xrefs(species:string,symbol:string):Observable<Todo[]>{
    this.apiurl = 'https://rest.ensembl.org/xrefs/symbol/' + species + '/' + symbol + ' ' + '?content-type=application/json';
    return this.http.get<Todo[]>(this.apiurl);
  }

  // GET sequence/id/:id  - https://rest.ensembl.org/sequence/id/ENSG00000157764?
  get_sequence(url_val:string){
    this.apiurl = 'https://rest.ensembl.org/sequence/id/'+ url_val+ '?content-type=application/json';  //'https://jsonplaceholder.typicode.com/';
    return this.http.get(this.apiurl);
    // ENSG00000248378
    // ENSG00000157764
  }

}

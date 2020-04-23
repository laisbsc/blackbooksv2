import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private baseUrl = './api/books';

  constructor(private http: HttpClient) { }

  //returns the list of books in the inventory
  getAll() {
     return this.http.get(this.baseUrl);
  }

  //inserts books in the inventory
  create(data){
    return this.http.post(this.baseUrl, data);
  }

  //updates a book item by given id and update value
  update(id, data){
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //deletes one book item given its parameter id
  delete(id){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(){
    return this.http.delete(this.baseUrl);
  }

  findByTitle(title){
    return this.http.get(`${this.baseUrl}?title=${title}`);
  }
}

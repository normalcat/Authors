import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
	authorId: any;
	author: any;

  constructor(private _http: HttpClient) { }

  addAuthor(author) {
  		this.author = author;
        return this._http.post('/authors', this.author);
    }

  getAuthors() {
        return this._http.get('/authors');
    }

    editPartial(ID) {
    	console.log("This is editPartial ");
        this.authorId = ID;
        console.log(this.authorId);
    }

   editAuthor(edited_author) {
        let url = '/authors/' + edited_author._id;
        console.log(edited_author);
        console.log("done");
        return this._http.put(url, edited_author);
    }

    deleteAuthor(authorId){
    	console.log(authorId);
    	let url = 'authors/' + authorId;
    	console.log(url);
        return this._http.delete(url);
    }

    getOneAuthor(ID) {
        let url = '/authors/' + ID;
        return this._http.get(url);
    }

    getOneAuthorId() {
        return this.authorId;
    }

}

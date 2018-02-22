import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  oneAuthor: any;
  oneAuthorId: any;

  ngOnInit() {
  	this.oneAuthorId = this._httpService.getOneAuthorId()
  	this.getOneAuthor(this.oneAuthorId);
  	console.log("One Author's ID", this.oneAuthorId);
  }

  getOneAuthor(ID) {
        let observable = this._httpService.getOneAuthor(ID);
        observable.subscribe(data => {
            this.oneAuthor = data.authors[0];
        })
    }

    updateAuthor() {
    	console.log(this.oneAuthor);
        let observable = this._httpService.editAuthor(this.oneAuthor);
        observable.subscribe(data => {
            console.log(data);
        })
    }
}

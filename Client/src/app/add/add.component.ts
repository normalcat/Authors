import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
	newAuthor: any;

  constructor(private _httpService: HttpService) {
  		this.newAuthor = {name: ''}
  }

  ngOnInit() {
  }

  submitAuthor(){
  	let observable = this._httpService.addAuthor(this.newAuthor);
        observable.subscribe(data => {
            console.log(data);
        })

        this.newAuthor = {name: ''};
  }

}

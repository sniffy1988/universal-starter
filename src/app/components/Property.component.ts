import {Component} from 'angular2/core';
import {JSONP_PROVIDERS}  from 'angular2/http';
import {NestoriaAPI} from '../services/nestoriaAPI.service';
import {ItemsComponent} from './items.component';

@Component({
  selector: 'property',
  providers: [JSONP_PROVIDERS, NestoriaAPI],
  directives: [ItemsComponent],
  template: `<input type="text" [(ngModel)]="searchQuery">
                <button (click)="search(searchQuery)">Go</button>
                <items-list [itemData]="items.data" *ngIf="items" [itemType]="items.type"></items-list>
                `
})

export class PropertyComponent {
  searchQuery:string;
  items;

  constructor(private _api:NestoriaAPI) {
    this.searchQuery = '';
  }

  search(query:string) {
    //noinspection TypeScriptUnresolvedVariable
    console.log(query);
    let response = this._api.fetch(query);
    response.then(data => {
        this.items = data;
      })
      .catch(err => {
        //noinspection TypeScriptUnresolvedVariable
        console.log(err);
      })
  }
}

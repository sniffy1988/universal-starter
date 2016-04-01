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
        const validCodes = ['100', '101', '110'],
            ambiguousCodes = ['200', '202'];
        let response = this._api.fetch(query);
        response
            .subscribe(
                data => {
                    //noinspection TypeScriptUnresolvedVariable
                    let response = data['_body'].response;
                    let responseCode = response.application_response_code;
                    //noinspection TypeScriptUnresolvedFunction
                    if (validCodes.indexOf(responseCode) > -1) {
                        this.items = {
                            type: 'listings',
                           data:  response.listings
                        };
                    } else { //noinspection TypeScriptUnresolvedFunction
                        if (ambiguousCodes.indexOf(responseCode) > -1) {
                            this.items = {
                                type:'locations',
                                data: response.locations
                            };
                        }
                    }
                    //noinspection TypeScriptUnresolvedVariable
                    console.log(this.items);
                }
            );
    }
}

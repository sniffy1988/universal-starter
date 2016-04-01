import {Component, Input} from 'angular2/core';
import {ItemComponent} from './item.component';

@Component({
    selector: 'items-list',
    directives: [ItemComponent],
    template: '<item *ngFor="#item of itemData" [type]="itemType" [render]="item"></item>'
})
export class ItemsComponent{
    @Input() itemData;
    @Input() itemType;
    items;
    constructor(){
        console.log(this.items);
    }
}

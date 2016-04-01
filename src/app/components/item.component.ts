import {Component, Input} from 'angular2/core';

@Component({
    selector: 'item',
    template: `
        <div>
            <img [src]="itemData.img_url">
            <h3>{{itemData.title}} | {{itemData.property_type}}</h3>
        </div>
        `
})
export class ItemComponent{
    @Input() itemData;
    constructor(){
    }
}

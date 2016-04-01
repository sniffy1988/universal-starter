import {Component, Input} from 'angular2/core';

@Component({
    selector: 'item',
    template: `
                <div *ngIf="type === 'locations'">{{render.long_title}}</div>
                <div *ngIf="type === 'listings'">
                    <h4>{{render.title}} | {{render.property_type}}</h4>
                    <img [src]="render.img_url">
                    <p>
                        Bathrooms: {{render.bathroom_number || 0}}
                    </p>
                    <p>
                        Bedrooms: {{render.bedroom_number || 0}}
                    </p>
                    <p>
                        Car spaces: {{render.car_spaces || 0}}
                    </p>
                    <p>{{render.summary}}</p>
                    <p>Price: {{render.price_formatted}}</p>
                </div>
`
})
export class ItemComponent {
    @Input() type;
    @Input() render;
}

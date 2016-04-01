import {Jsonp} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class NestoriaAPI {
    baseUrl = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&callback=JSONP_CALLBACK&place_name=';

    constructor(private jsonp:Jsonp) {

    }

    fetch(text:string) {
        return this.jsonp
            .get(this.baseUrl + text);
    }
}

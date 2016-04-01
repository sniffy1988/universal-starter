import {Jsonp} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class NestoriaAPI {
    private baseUrl = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=1&callback=JSONP_CALLBACK&place_name=';

    constructor(private jsonp:Jsonp) {

    }

    fetch(text:string) {
        const validCodes = ['100', '101', '110'],
            ambiguousCodes = ['200', '202'];
        let items = {};
        let promice = new Promise((resolve, reject) => {
            this.jsonp
                .get(this.baseUrl + text)
                .subscribe(
                    data => {
                        //noinspection TypeScriptUnresolvedVariable
                        let response = data['_body'].response;
                        let responseCode = response.application_response_code;
                        //noinspection TypeScriptUnresolvedFunction
                        if (validCodes.indexOf(responseCode) > -1) {
                            items = {
                                type: 'listings',
                                data: response.listings
                            };
                            resolve(items);
                        } else if (ambiguousCodes.indexOf(responseCode) > -1) {
                            items = {
                                type: 'locations',
                                data: response.locations
                            };
                            resolve(items);
                        } else {
                            reject(data);
                        }
                    }
                );
        });
        return promice;
    }
}

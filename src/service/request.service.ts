import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Network } from '@ionic-native/network';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class RequestService {

    private TIMEOUT = 30000;

    constructor(private http: Http,
        private network: Network) {
    }

    getData(url) {
        return new Promise((resolve, reject) => {
                //let getRequest = () => {
                    this.http.get(url)
                        .timeout(this.TIMEOUT)
                        .toPromise()
                        .then((resp: any) => {
                            resolve(this.getJsonData(resp));
                        })
                        .catch((error) => {
                            reject(this.getJsonData(error));
                        });
                //}
               // getRequest();
        });

    }

    private getJsonData(res: Response): any {
        let body = null;
        try {
            body = res.json();
        } catch (e) {
            //sem content no response
        }
        return body;
    }


}
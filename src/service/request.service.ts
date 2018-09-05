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
                    this.http.get(url)
                        .timeout(this.TIMEOUT)
                        .toPromise()
                        .then((resp: any) => {
                            resolve(this.getJsonData(resp));
                        })
                        .catch((error) => {
                            reject(this.getJsonData(error));
                        });
        });

    }

    postData(url, dados?) {
        return new Promise((resolve, reject) => {
                    this.http.post(url, dados)
                        .timeout(this.TIMEOUT)
                        .toPromise()
                        .then((resp: any) => {
                            resolve(this.getJsonData(resp));
                        })
                        .catch((error) => {
                            reject(this.getJsonData(error));
                        });
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

    buildUrlQueryParams(params, urlRequest) {
        if(params == null)
            return null;

        for (var key in params) {
            urlRequest = urlRequest.replace("{" + key + "}", encodeURIComponent(params[key]));
        }
        console.log("urlRequest: " + urlRequest);
        return urlRequest;
    }

    buildHttpBodyFormData(params, urlRequest) {
        if(params == null)
            return null;

        var first = true;
        for (var key in params) {
            if(params[key] != null){
                if(first) {
                    first = false;
                } else {
                    urlRequest += "&"
                }
                urlRequest += key + "=" + encodeURIComponent(params[key]);
            }
        }
        console.log("urlRequest: " + urlRequest);
        return urlRequest;
    }


}
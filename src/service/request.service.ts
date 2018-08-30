import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Network } from '@ionic-native/network';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

@Injectable()
export class RequestService {

    private header: Headers;
    private TIMEOUT = 30000;

    constructor(private http: Http,
        private network: Network) {
    }

    getData(url) {
        return new Promise((resolve, reject) => {
            this.checkConnection().then(() => {
                let getRequest = () => {
                    this.http.get(url, this.getRequestOptions(url))
                        .timeout(this.TIMEOUT)
                        .toPromise()
                        .then((resp: any) => {
                            this.header = null;
                            resolve(this.getJsonData(resp));
                        })
                        .catch((error) => {
                            this.header = null;
                            reject(error);
                        });
                }
                getRequest();
            }, erro => {
                reject(erro);
            });
        });

    }


    private checkConnection() {
        console.log("Status rede: " + this.network.type);
        if (this.network.type === 'none') {
            return Promise.reject({
                status: 12,
                message: "Você está offline."
            });
        }
        return Promise.resolve();
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

    private getRequestOptions(urlRequest: string) {
        var options = null;
        if(this.header) {
            options = new RequestOptions({headers: this.header});
        }
        return options;
    }


}
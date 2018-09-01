import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ViewController } from 'ionic-angular';

@IonicPage({
    name: 'ModalCadastroAtendimento'
})
@Component({
    selector: 'page-modal-cadastro-atendimento',
    templateUrl: 'modal-cadastro-atendimento.html'
})
export class ModalCadastroAtendimentoPage {
    @ViewChild(Content) content: Content;

    constructor(private viewCtrl: ViewController) {
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}
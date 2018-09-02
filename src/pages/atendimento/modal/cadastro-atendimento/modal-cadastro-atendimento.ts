import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../../../../service/request.service';
import { APP_CONFIG } from '../../../../app/app.config';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { NomeId } from './nome-paciente.model';

@IonicPage({
    name: 'ModalCadastroAtendimento'
})
@Component({
    selector: 'page-modal-cadastro-atendimento',
    templateUrl: 'modal-cadastro-atendimento.html'
})
export class ModalCadastroAtendimentoPage {
    @ViewChild(Content) content: Content;

    private form: FormGroup;
    atendimento: any = {};
    tiposAtendimento: any;
    responsaveis: any;
    p: string;
    pacientes: any = [];
    dataService: CompleterData;
    searchData: Array<NomeId> = [];

    constructor(private completerService: CompleterService, private viewCtrl: ViewController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private requestService: RequestService) {

        this.atendimento.paciente = {};
        this.atendimento.paciente.pessoa = {}
        this.initVariables();
        this.dataService = completerService.local(this.searchData, 'nome', 'nome');

    }

    selecionado(selected: CompleterItem) {
        if (selected) {
            this.atendimento.paciente.pessoa.id = selected.originalObject.id;
            this.atendimento.paciente.pessoa.cpf = selected.originalObject.cpf;
            console.log(this.atendimento.paciente.pessoa.id);
            console.log(this.atendimento.paciente.pessoa.cpf);
        }
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

    initVariables() {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.listarTiposDeAtedimento();
        this.listarPacientes();
        loading.dismiss();
    }

    listarTiposDeAtedimento() {
        this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO).then((tiposAtendimento: any) => {
            this.tiposAtendimento = tiposAtendimento;
            console.log(this.tiposAtendimento);
        }, error => {
            console.error(error);
        });
    }

    listarPacientes() {
        this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_PACIENTES).then((pacientes: any) => {
            this.pacientes = pacientes;
            pacientes.forEach(p => {
                this.searchData.push(new NomeId(p.pessoa.nome, p.pessoa.cpf, p.pessoa.id));
            });
            console.log(this.pacientes);
        }, error => {
            console.error(error);
        });
    }

    listarAtributosDeTipoAt() {
        let loading = this.loadingCtrl.create();
        loading.present();
        let urlRequest = this.requestService.buildUrlQueryParams({ cargo: this.atendimento.tipoAtendimento.responsavel }, APP_CONFIG.WEBSERVICE.LISTAR_RESPONSAVEIS);
        this.requestService.getData(urlRequest)
            .then((responsaveis: any) => {
                this.responsaveis = responsaveis;
                console.log(this.responsaveis);
                loading.dismiss();
            }, error => {
                console.error(error);
                loading.dismiss();
            });
    }

}
import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../../service/request.service';
import { APP_CONFIG } from '../../../../app/app.config';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../../../model/pessoa.model';
import { ValorAferidoModel } from '../../../../model/valor-aferido.model';
import moment from 'moment';

@IonicPage({
    name: 'ModalCadastroAtendimento'
})
@Component({
    selector: 'page-modal-cadastro-atendimento',
    templateUrl: 'modal-cadastro-atendimento.html'
})
export class ModalCadastroAtendimentoPage {
    @ViewChild(Content) content: Content;

    formSubmit = false;
    private form: FormGroup;
    atendimento: any = {};
    tiposAtendimento: any = [];
    responsaveis: any = [];
    pacientes: any = [];
    dataService: CompleterData;
    searchData: Array<PessoaModel> = [];
    p: string;
    pacienteSelecionado: boolean = false;

    constructor(public toastCtrl: ToastController, private completerService: CompleterService, private viewCtrl: ViewController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private requestService: RequestService) {

        this.atendimento.paciente = {};
        this.atendimento.paciente.pessoa = {};
        this.atendimento.valoresAferidos = [];
        this.initVariables();
        this.dataService = completerService.local(this.searchData, 'nome', 'nome');

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', Validators.required],
            data: ['', [Validators.required, this.validaData]],
            hora: ['', [Validators.required, this.validaHora]],
            tipoAtendimento: ['', Validators.required],
            responsavel: ['', Validators.required]
        });
    }

    selecionado(selected: CompleterItem) {
        if (selected) {
            this.pacienteSelecionado = true;
            this.atendimento.paciente.pessoa.id = selected.originalObject.id;
            this.atendimento.paciente.pessoa.cpf = selected.originalObject.cpf;
        }
    }


    dismiss(data?) {
        data ? this.viewCtrl.dismiss(data) : this.viewCtrl.dismiss();
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
                this.searchData.push(new PessoaModel(p.pessoa.nome, p.pessoa.cpf, p.pessoa.id));
            });
            console.log(this.pacientes);
        }, error => {
            console.error(error);
        });
    }

    listarAtributosDeTipoAt() {
        let loading = this.loadingCtrl.create();
        loading.present();
        this.atendimento.valoresAferidos = [];
        if (this.atendimento.tipoAtendimento.aferiveis != null) {
            this.atendimento.tipoAtendimento.aferiveis.forEach(a => {
                this.atendimento.valoresAferidos.push(new ValorAferidoModel(a.id, a.nome, null))
            });
        }
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

    salvarAtendimento() {
        this.formSubmit = true;
        if (this.form.valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.atendimento.ativo = true;
            this.atendimento.usuario.pessoa.dataNascimento = moment(this.atendimento.usuario.pessoa.dataNascimento, 'DD-MM-YYYY').format('YYYY-MM-DD');
            this.atendimento.data = moment(this.atendimento.data, 'DD-MM-YYYY').format('YYYY-MM-DD');
            this.atendimento.valoresAferidos.forEach(v => {
                if (v.valorAferido != null) {
                    v.valorAferido = parseFloat(v.valorAferido);
                }
            });
            console.log(this.atendimento);
            let data = JSON.parse(JSON.stringify(this.atendimento));
            this.requestService.postData(APP_CONFIG.WEBSERVICE.CADASTRAR_ATENDIMENTO, data).then((response: any) => {
                console.log(response);
                loading.dismiss();
                this.dismiss(true);
            }, erro => {
                console.error(erro);
                loading.dismiss();
                this.presentToast(erro.errorMessage);
            });
        }
    }

    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }

    private validaData(control: FormControl) {
        let data = moment(control.value, 'DD-MM-YYYY');
        let valid = (data.isValid && (data.isSameOrBefore(moment()))) ? null : { 'invalid': true };
        return valid;
    }

    private validaHora(control: FormControl) {
        let hora = moment(control.value, 'HH:mm');
        let valid = hora.isValid ? null : { 'invalid': true };
        return valid;
    }
}
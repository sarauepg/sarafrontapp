import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../../service/request.service';
import { APP_CONFIG } from '../../../../app/app.config';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../../../model/pessoa.model';
import moment from 'moment';
import { MaskType } from '../../../../directives/mask-directive';

@IonicPage({
    name: 'ModalCadastroAgendamento'
})
@Component({
    selector: 'page-modal-cadastro-agendamento',
    templateUrl: 'modal-cadastro-agendamento.html'
})
export class ModalCadastroAgendamentoPage {
    @ViewChild(Content) content: Content;

    MaskType = MaskType;

    formSubmit = false;
    private form: FormGroup;
    agendamento: any = {};
    tiposAtendimento: any = [];
    responsaveis: any = [];
    pacientes: any = [];
    dataService: CompleterData;
    searchData: Array<PessoaModel> = [];
    dataAgendamento: string;
    p: string;
    pacienteSelecionado: boolean = false;

    constructor(public toastCtrl: ToastController, private completerService: CompleterService, private viewCtrl: ViewController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private requestService: RequestService) {

        this.agendamento.paciente = {};
        this.agendamento.paciente.pessoa = {};
        this.agendamento.valoresAferidos = [];
        this.initVariables();
        this.dataService = completerService.local(this.searchData, 'nome', 'nome');

        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            cpf: ['', Validators.required],
            telefonePrimario: ['', Validators.required],
            telefoneSecundario: [''],
            data: ['', [Validators.required, this.dataValidator, Validators.minLength(10)]],
            hora: ['', [Validators.required, this.horaValidator, Validators.minLength(5)]],
            tipoAtendimento: ['', Validators.required]
        });

    }

    selecionado(selected: CompleterItem) {
        if (selected) {
            this.pacienteSelecionado = true;
            this.agendamento.paciente.pessoa.id = selected.originalObject.id;
            this.agendamento.paciente.pessoa.cpf = selected.originalObject.cpf;
            this.agendamento.paciente.pessoa.telefonePrimario = selected.originalObject.telefonePrimario;
            this.agendamento.paciente.pessoa.telefoneSecundario = selected.originalObject.telefoneSecundario;
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
        this.requestService.getData(APP_CONFIG.WEBSERVICE.LISTAR_TIPO_ATENDIMENTO_AGENDAVEL).then((tiposAtendimento: any) => {
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
                this.searchData.push(new PessoaModel(p.pessoa.id, p.pessoa.nome, p.pessoa.cpf, p.pessoa.telefonePrimario, p.pessoa.telefoneSecundario));
            });
            console.log(this.pacientes);
        }, error => {
            console.error(error);
        });
    }

    salvarAgendamento() {
        this.formSubmit = true;
        if (this.form.valid) {
            let loading = this.loadingCtrl.create();
            loading.present();
            this.agendamento.status = 'M';
            this.agendamento.data = moment(this.dataAgendamento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            let dataHoraValid = true;
            if (moment(this.dataAgendamento + " " + this.agendamento.hora, 'DD/MM/YYYY HH:mm').isBefore(moment())) {
                dataHoraValid = false;
                loading.dismiss();
                this.presentToast("Um agendamento não pode ser realizado em uma data passada.");
            }
            if (dataHoraValid) {
                console.log(this.agendamento);
                let data = JSON.parse(JSON.stringify(this.agendamento));
                this.requestService.postData(APP_CONFIG.WEBSERVICE.CADASTRAR_AGENDAMENTO, data).then((response: any) => {
                    console.log(response);
                    loading.dismiss();
                    this.dismiss(true);
                }, erro => {
                    console.error(erro);
                    loading.dismiss();
                    this.presentToast(erro.errorMessage);
                });
            }
        }else{
            this.presentToast("Por favor, cheque os campos em destaque.");
        }
    }

    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }

    private dataValidator(control: FormControl) {
        let data = moment(control.value, 'DD/MM/YYYY').isValid();
        let valid = data ? null : { data: true };
        return valid;
    }

    private horaValidator(control: FormControl) {
        let hora = moment(control.value, 'HH:mm').isValid();
        let valid = hora ? null : { hora: true };
        return valid;
    }
}
import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, ViewController, LoadingController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RequestService } from '../../../../service/request.service';
import { APP_CONFIG } from '../../../../app/app.config';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { PessoaModel } from '../../../../model/pessoa.model';
import { ValorAferidoModel } from '../../../../model/valor-aferido.model';
import moment from 'moment';

@IonicPage({ name: 'ModalCadastroAtendimento' })
@Component({ selector: 'page-modal-cadastro-atendimento', templateUrl: 'modal-cadastro-atendimento.html' })
export class ModalCadastroAtendimentoPage {
    @ViewChild(Content) content: Content;

    formSubmit = false;
    agendado = false;
    isEditing = false;
    dataAt: string;
    private form: FormGroup;
    private formAferiveis: FormGroup;
    atendimento: any = {};
    tiposAtendimento: any = [];
    responsaveis: any = [];
    pacientes: any = [];
    dataService: CompleterData;
    searchData: Array<PessoaModel> = [];
    p: string;
    pacienteSelecionado: boolean = false;

    constructor(private alertCtrl: AlertController, public params: NavParams, public toastCtrl: ToastController, private completerService: CompleterService, private viewCtrl: ViewController, private formBuilder: FormBuilder, public loadingCtrl: LoadingController, private requestService: RequestService) {

        this.atendimento.paciente = {};
        this.atendimento.paciente.pessoa = {};
        this.atendimento.valoresAferidos = [];
        this.initVariables();
        this.dataService = completerService.local(this.searchData, 'nome', 'nome');
        this.atenderAgendamento();
        this.editarAtendimento();

        this.form = this.formBuilder.group({
            nome: [{ value: '', disabled: this.agendado }, Validators.required],
            nomeAgendado: [{ value: '', disabled: !this.agendado }, Validators.required],
            cpf: [''],
            data: ['', [Validators.required, this.dataValidator, Validators.minLength(10)]],
            hora: ['', [Validators.required, this.horaValidator, Validators.minLength(5)]],
            tipoAtendimento: [{ value: '', disabled: this.agendado }, Validators.required],
            tipoAtendimentoAgendado: [{ value: '', disabled: !this.agendado }, Validators.required],
            responsavel: [{ value: '', disabled: this.isEditing }, Validators.required],
            responsavelIsEditing: [{ value: '', disabled: !this.isEditing }, Validators.required]
        });
    }

    ionViewDidLoad() {
        if (this.isEditing) {
            let atendimento: any = this.params.get('atendimento');
            this.carregarValoresAferidos(atendimento.id);
        }
    }

    carregarValoresAferidos(idAtendimento) {
        let loading = this.loadingCtrl.create();
        loading.present();
        let urlRequest = this.requestService.buildUrlQueryParams({ idAtendimento: idAtendimento }, APP_CONFIG.WEBSERVICE.CARREGAR_VALORES_AFERIDOS);
        this.requestService.getData(urlRequest)
            .then((valores: any) => {
                this.atendimento.valoresAferidos.forEach(v => {
                    valores.forEach(valor => {
                        if (v.idAferivel == valor.idAferivel) {
                            v.valorAferido = valor.valorAferido;
                        }
                    });
                });
                console.log(this.atendimento.valoresAferidos);
                loading.dismiss();
            }, error => {
                console.error(error);
                loading.dismiss();
            });
    }

    atenderAgendamento() {
        let agendamento: any = this.params.get('agendamento');
        if (agendamento != null) {
            this.agendado = true;
            this.atendimento.paciente = agendamento.paciente;
            this.dataAt = agendamento.data;
            this.atendimento.hora = agendamento.hora;
            this.atendimento.tipoAtendimento = agendamento.tipoAtendimento;
            this.listarAtributosDeTipoAt();
        }
    }

    editarAtendimento() {
        let atendimento: any = this.params.get('atendimento');
        if (atendimento != null) {
            this.agendado = true;
            this.isEditing = true;
            this.atendimento.id = atendimento.id;
            this.atendimento.paciente = atendimento.paciente;
            this.dataAt = atendimento.data;
            this.atendimento.hora = atendimento.hora;
            this.atendimento.tipoAtendimento = atendimento.tipoAtendimento;
            this.atendimento.usuario = atendimento.usuario;
            this.atendimento.anotacao = atendimento.anotacao;
            this.listarAtributosDeTipoAt();
        }
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
                this.searchData.push(new PessoaModel(p.pessoa.id, p.pessoa.nome, p.pessoa.cpf, p.pessoa.telefonePrimario, p.pessoa.telefoneSecundario));
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
            this.atendimento.usuario.pessoa.dataNascimento = moment(this.atendimento.usuario.pessoa.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            this.atendimento.data = moment(this.dataAt, 'DD/MM/YYYY').format('YYYY-MM-DD');
            if (this.atendimento.paciente.pessoa.dataNascimento != null) {
                this.atendimento.paciente.pessoa.dataNascimento = moment(this.atendimento.paciente.pessoa.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            }
            this.atendimento.valoresAferidos.forEach(v => {
                if (v.valorAferido != null && typeof v.valorAferido == "string") {
                    v.valorAferido = parseFloat(v.valorAferido);
                }
            });
            let aferiveisValid = true;
            this.atendimento.valoresAferidos.forEach(v => {
                if (v.valorAferido != null && (v.valorAferido > 500 || v.valorAferido < 0 ) && aferiveisValid == true) {
                    aferiveisValid = false;
                    loading.dismiss();
                    this.presentToast(v.nomeAferivel + " inválido.");
                }
            })
            let dataHoraValid = true;
            if (moment(this.dataAt + " " + this.atendimento.hora, 'DD/MM/YYYY HH:mm').isAfter(moment())) {
                dataHoraValid = false;
                loading.dismiss();
                this.presentToast("Um atendimento não pode ser realizado em uma data futura.");
            }
            if (aferiveisValid && dataHoraValid) {
                console.log(this.atendimento);
                let data = JSON.parse(JSON.stringify(this.atendimento));
                if(!this.isEditing){
                this.requestService.postData(APP_CONFIG.WEBSERVICE.CADASTRAR_ATENDIMENTO, data).then((response: any) => {
                    console.log(response);
                    loading.dismiss();
                    this.dismiss(true);
                }, erro => {
                    console.error(erro);
                    loading.dismiss();
                    this.presentToast(erro.errorMessage);
                });
                }else{
                    this.requestService.putData(APP_CONFIG.WEBSERVICE.ALTERAR_ATENDIMENTO, data).then((response: any) => {
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
        } else {
            this.presentToast("Por favor, cheque os campos em destaque.");
        }
    }

    alterarAtendimento() {
        let alert = this.alertCtrl.create({
            title: 'Oops!',
            message: 'Parece que essa funcionalidade ainda não foi implementada. Aguarde futuras versões.',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        console.log('Ok clicked');
                    }
                }
            ]
        });
        alert.present();
    }

    presentToast(msg) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 5000
        });
        toast.present();
    }

    private dataValidator(control: FormControl) {
        let data = moment(control.value, 'DD-MM-YYYY').isValid();
        let valid = data ? null : { data: true };
        return valid;
    }

    private horaValidator(control: FormControl) {
        let hora = moment(control.value, 'HH:mm').isValid();
        let valid = hora ? null : { hora: true };
        return valid;
    }
}
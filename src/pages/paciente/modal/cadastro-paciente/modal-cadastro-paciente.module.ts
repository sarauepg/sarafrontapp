import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../../directives/shared.module';
import { ModalCadastroPacientePage } from './modal-cadastro-paciente';

@NgModule({
    declarations: [ModalCadastroPacientePage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroPacientePage),
        SharedModule
    ]
})
export class ModalCadastroPacienteModule { }
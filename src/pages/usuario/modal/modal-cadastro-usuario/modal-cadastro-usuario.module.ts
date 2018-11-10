import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../../directives/shared.module';
import { ModalCadastroUsuarioPage } from './modal-cadastro-usuario';

@NgModule({
    declarations: [ModalCadastroUsuarioPage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroUsuarioPage),
        SharedModule
    ]
})
export class ModalCadastroUsuarioModule { }
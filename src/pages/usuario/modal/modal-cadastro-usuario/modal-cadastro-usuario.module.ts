import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng2CompleterModule } from 'ng2-completer';
import { SharedModule } from '../../../../directives/shared.module';
import { ModalCadastroUsuarioPage } from './modal-cadastro-usuario';

@NgModule({
    declarations: [ModalCadastroUsuarioPage], 
    imports: [
        IonicPageModule.forChild(ModalCadastroUsuarioPage),
        Ng2CompleterModule,
        SharedModule
    ]
})
export class ModalCadastroUsuarioModule { }
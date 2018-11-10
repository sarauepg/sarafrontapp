import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPage } from './usuario';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [UsuarioPage],
  imports: [
    IonicPageModule.forChild(UsuarioPage),
    SharedModule
  ],
})
export class UsuarioPageModule {}

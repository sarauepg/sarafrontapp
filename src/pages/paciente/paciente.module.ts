import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientePage } from './paciente';
import { SharedModule } from '../../directives/shared.module';

@NgModule({
  declarations: [PacientePage],
  imports: [
    IonicPageModule.forChild(PacientePage),
    SharedModule
  ],
})
export class PacientePageModule {}

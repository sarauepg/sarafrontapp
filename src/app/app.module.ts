import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgendamentoPage } from '../pages/agendamento/agendamento';
import { AtendimentoPage } from '../pages/atendimento/atendimento';
import { PacientePage } from '../pages/paciente/paciente';
import { TipoAtendimentoPage } from '../pages/tipo-atendimento/tipo-atendimento';
import { UsuarioPage } from '../pages/usuario/usuario';
import { VisaoGeralPage } from '../pages/visao-geral/visao-geral';
import { HttpModule } from '@angular/http';
import { RequestService } from '../service/request.service';
import { Network } from '@ionic-native/network';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    MyApp,
    AgendamentoPage,
    AtendimentoPage,
    PacientePage,
    TipoAtendimentoPage,
    UsuarioPage,
    VisaoGeralPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgxDatatableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgendamentoPage,
    AtendimentoPage,
    PacientePage,
    TipoAtendimentoPage,
    UsuarioPage,
    VisaoGeralPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    RequestService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

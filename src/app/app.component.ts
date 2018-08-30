import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AtendimentoPage } from '../pages/atendimento/atendimento';
import { AgendamentoPage } from '../pages/agendamento/agendamento';
import { TipoAtendimentoPage } from '../pages/tipo-atendimento/tipo-atendimento';
import { PacientePage } from '../pages/paciente/paciente';
import { UsuarioPage } from '../pages/usuario/usuario';
import { VisaoGeralPage } from '../pages/visao-geral/visao-geral';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Agenda', component: AgendamentoPage, icon: 'md-calendar' },
      { title: 'Atendimentos', component: AtendimentoPage, icon: 'md-medkit' },
      { title: 'Tipos de atendimento', component: TipoAtendimentoPage, icon: 'md-list' },
      { title: 'Pacientes', component: PacientePage, icon: 'md-people' },
      { title: 'Usuários', component: UsuarioPage, icon: 'md-people' },
      { title: 'Visão geral ', component: VisaoGeralPage, icon: 'md-pie' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}

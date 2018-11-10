import { NgModule } from '@angular/core';
import { MaxLengthDirective } from './max-length-directive';
import { MaskDirective } from './mask-directive';
import { Ng2CompleterModule } from 'ng2-completer';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
	declarations: [
		MaxLengthDirective,
		MaskDirective
	],
	exports: [
		MaxLengthDirective,
		MaskDirective,
		Ng2CompleterModule,
        Ng2GoogleChartsModule
	],
	imports: [
		Ng2CompleterModule,
        Ng2GoogleChartsModule
	]
})

export class SharedModule {}
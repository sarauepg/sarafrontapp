import { NgModule } from '@angular/core';
import { MaxLengthDirective } from './max-length-directive';
import { MaskDirective } from './mask-directive';

@NgModule({
	declarations: [
		MaxLengthDirective,
		MaskDirective
	],
	exports: [
		MaxLengthDirective,
		MaskDirective
	]
})

export class SharedModule {}
import {Directive, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

export enum     MaskType {
    CPF_CNPJ,
    CELLPHONE
}
export interface IMask {
    mask?: string;
    type?: MaskType;
}
/**
 * Adaptação de uma directiva genérica para uso de CPF/CNPJ no mesmo campo e outros tipos comum como telefone (8/9 digitos).
 * diretiva original: https://github.com/tiaguinho/ionic2-mask-directive/blob/master/index.ts
 */
@Directive({
    selector: '[mask]',
    host: {
        '(change)': 'ngOnChanges()',
        '(keyup)': 'onKeyUp($event)',
        '(keydown)': 'onKeyUp($event)'
    }
})
export class MaskDirective {

    /**
     * mask precisar ser um objeto do tipo
     */
    @Input('mask') mask: IMask;
	// @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    private cpfMask = "999.999.999-99";
    private cnpjMask = "99.999.999/9999-99";
    private cellphone8Mask = "(99) 9999-9999";
    private cellphone9Mask = "(99) 99999-9999";

    constructor(private control: NgControl) { }
    
    /*when loading dynamically data to the input, without this 
    the mask will only work on keyup event changes */
    ngOnChanges() {
        let value = this.control.control.value;
        if (value) {
            this.control.control.setValue(this.format(value));
        }
    }
    
    onKeyUp(event) {
        try {
            if (event.keyCode !== 13 && event.keyCode !== 9) {
                let value = this.control.control.value;
                this.control.control.setValue(this.format(value));
            }
        } catch (erro) { }
    }

	// unmask(event) {
     //    if(event.target.value) {
	// 		let unmasked = event.target.value.replace(/[^a-z0-9]/gi, "");
     //        this.ngModelChange.emit(unmasked);
     //    }
	// }

    private format(v: string): string {
        let s: string = '';

        var matches = v.match(/[a-zA-Z0-9]+/g);
        if (matches !== null) {
            let mask = this.getMaskByType(this.mask, v);
            if(mask == null) return;

            let value = matches.join('').split('');
            var chars = mask.split('');
            for (let c of chars) {
                if (value.length === 0) {
                    break;
                }
                switch (c) {
                    case '#': //qualquer
                        s += value[0];
                        value = value.slice(1);
                        break;

                    case '9':
                        if (value[0].match(/\d/) !== null) {
                            s += value[0];
                            value = value.slice(1);
                        }
                        break;

                    case 'A':
                        if (value[0].match(/[a-zA-Z]/) !== null) {
                            s += value[0];
                            value = value.slice(1);
                        }
                        break;

                    default:
                        s += c;
                }
            }
        }
        return s;
    }

    private getMaskByType(mask: IMask, value: string) {
        if(mask == null) return null;
        if(mask.type == null) return mask.mask;

        switch(mask.type) {
            case MaskType.CPF_CNPJ:
                return value.length > 14 ? this.cnpjMask : this.cpfMask;

            case MaskType.CELLPHONE:
                return value.length > 14 ? this.cellphone9Mask : this.cellphone8Mask;

            default:
                break;
        }
    }
}
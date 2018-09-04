import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: '[cmaxlength]',
    host: {
        '(input)': 'limit($event)',
        '(blur)': 'limit($event)',
        '(focus)': 'limit($event)',
    }
})
export class MaxLengthDirective {

    @Input('cmaxlength') cMaxLength:any;
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    limit(event) {
        try {
            const element = event.target as HTMLInputElement;
            const limit = this.cMaxLength;
            if(element.value.length > limit) {
    			element.value = element.value.substr(0, limit);
    		}
            this.ngModelChange.emit(element.value);
        } catch (erro) {
            console.error(erro);
        }
    }
}

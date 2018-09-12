export class PessoaModel{
    constructor(public id:number, public nome: string, public cpf: string, public telefonePrimario: string, public telefoneSecundario: string){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.telefonePrimario = telefonePrimario;
        this.telefoneSecundario = telefoneSecundario;

    }
}
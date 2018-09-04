export class PessoaModel{
    constructor(public nome: string, public cpf: string, public id:number){
        this.nome = nome;
        this.cpf = cpf;
        this.id = id;
    }
}
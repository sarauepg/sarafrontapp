//NEGOCIO
let LOCALHOST_SERVER_ADDRESS = "http://localhost";

/* PARA TROCAR DE AMBIENTE APENAS MUDAR A VARIAVEL. CASO QUEIRA RODAR NO NAVEGADOR ALTERAR TAMBEM "ionic.config.json" */
let SERVER_SELECTED =LOCALHOST_SERVER_ADDRESS;

let API_ADDRESS 	   = SERVER_SELECTED + ":8080/sara/";

let PROXY = "/proxy/sara/";

let END_POINT = PROXY;


export const APP_CONFIG = {
	SERVER_SELECTED: SERVER_SELECTED,
	WEBSERVICE: {
		// TIPO DE ATENDIMENTO
		LISTAR_TIPO_ATENDIMENTO: END_POINT + "tipoatendimento/listar",
		ADICIONAR_TIPO_ATENDIMENTO: END_POINT + "tipoatendimento/cadastrar",

		// ATENDIMENTO
		CADASTRAR_ATENDIMENTO: END_POINT + "atendimento/cadastrar",
		FILTRAR_ATENDIMENTO: END_POINT + "atendimento/filtrar?",

		// USUÁRIO
		LISTAR_RESPONSAVEIS: END_POINT + "usuario/listarResponsaveis?cargo={cargo}",

		// PACIENTE
		LISTAR_PACIENTES: END_POINT + "paciente/listar",
		CADASTRAR_PACIENTES: END_POINT + "paciente/cadastrar",
		FILTRAR_PACIENTE: END_POINT + "paciente/filtrar?",

		// LOTAÇÃO
		LISTAR_LOTACOES: END_POINT + "lotacao/listar"
	}
};
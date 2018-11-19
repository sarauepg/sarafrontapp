//NEGOCIO
let LOCALHOST_SERVER_ADDRESS = "http://localhost";
let AMAZON_SERVER_ADDRESS = "http://18.228.133.109";

/* PARA TROCAR DE AMBIENTE APENAS MUDAR A VARIAVEL. CASO QUEIRA RODAR NO NAVEGADOR ALTERAR TAMBEM "ionic.config.json" */
let SERVER_SELECTED =AMAZON_SERVER_ADDRESS;

let API_ADDRESS = SERVER_SELECTED + ":8080/sara/";

//let PROXY = "/proxy/sara/";

let END_POINT = API_ADDRESS;


export const APP_CONFIG = {
	SERVER_SELECTED: SERVER_SELECTED,
	WEBSERVICE: {
		// TIPO DE ATENDIMENTO
		LISTAR_TIPO_ATENDIMENTO: END_POINT + "tipoatendimento/listar",
		LISTAR_TIPO_ATENDIMENTO_AGENDAVEL: END_POINT + "tipoatendimento/listarAgendaveis",
		ADICIONAR_TIPO_ATENDIMENTO: END_POINT + "tipoatendimento/cadastrar",
		DELETAR_TIPO_ATENDIMENTO: END_POINT + "tipoatendimento/deletarTipoAtendimento?idTipoAt={idTipoAt}",

		// AGENDAMENTO
		CADASTRAR_AGENDAMENTO: END_POINT + "agendamento/cadastrar",
		FILTRAR_AGENDAMENTO: END_POINT + "agendamento/filtrar?",
		ALTERAR_AGENDAMENTO: END_POINT + "agendamento/alterar",

		// ATENDIMENTO
		CADASTRAR_ATENDIMENTO: END_POINT + "atendimento/cadastrar",
		FILTRAR_ATENDIMENTO: END_POINT + "atendimento/filtrar?",
		ALTERAR_ATENDIMENTO: END_POINT + "atendimento/alterar",
		CARREGAR_VALORES_AFERIDOS: END_POINT + "atendimento/valoresAferidos?idAtendimento={idAtendimento}",
		AT_X_TIPOAT: END_POINT + "atendimento/atendimentoxtipoat?",
		AT_X_LOTACAO: END_POINT + "atendimento/atendimentoxlotacao?",

		// USUÁRIO
		LISTAR_RESPONSAVEIS: END_POINT + "usuario/listarResponsaveis?cargo={cargo}",
		CADASTRAR_USUARIOS: END_POINT + "usuario/cadastrar",
		ALTERAR_USUARIOS: END_POINT + "usuario/alterar",
		LISTAR_USUARIOS: END_POINT + "usuario/listar",
		FILTRAR_USUARIO: END_POINT + "usuario/filtrar?",
		ALTERAR_USUARIO: END_POINT + "usuario/alterar",
		LOGIN: END_POINT + "usuario/login",

		// PACIENTE
		LISTAR_PACIENTES: END_POINT + "paciente/listar",
		CADASTRAR_PACIENTES: END_POINT + "paciente/cadastrar",
		ALTERAR_PACIENTES: END_POINT + "paciente/alterar",
		FILTRAR_PACIENTE: END_POINT + "paciente/filtrar?",

		// LOTAÇÃO
		LISTAR_LOTACOES: END_POINT + "lotacao/listar"
	}
};
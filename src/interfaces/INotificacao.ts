export enum TipoNotificacao {
    INFO,
    SUCESSO,
    FALHA,
    ERRO
}

export interface INotificacao {
    titulo: string,
    texto: string,
    tipo: TipoNotificacao,
    id: number
}
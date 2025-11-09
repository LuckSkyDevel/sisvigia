export interface Perfil {
    codPerfil: number;
    nomPerfil: string;
    sglPerfil: string;
    stPerfilAtivo: boolean;
    codPerfilPai?: number;
    dtInclusao: Date;
}
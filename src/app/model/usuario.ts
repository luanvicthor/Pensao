import { Endereco } from './endereco';

export class Usuario {
    nome:string;
    email:string;
    pws:string;
    foto:string;
    ativo:boolean = true;
    enderecos:Endereco[] = []
}

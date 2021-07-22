import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/interfaces/jogador.interfaces';

export interface Categoria extends Document {
  readonly categoria: String;
  descricao: String;
  evento: Array<Evento>;
  jogadores: Array<Jogador>;
}

export interface Evento {
  nome: String;
  operacao: String;
  valor: Number;
}

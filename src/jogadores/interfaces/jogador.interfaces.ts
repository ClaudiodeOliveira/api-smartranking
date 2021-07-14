import { Document } from 'mongoose';

export interface Jogador extends Document {
  readonly telefone: String;
  readonly email: String;
  nome: String;
  ranking: String;
  posicaoRanking: Number;
  urlFotoJogador: String;
}

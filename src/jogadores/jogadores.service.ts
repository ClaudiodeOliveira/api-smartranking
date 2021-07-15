import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogador } from './dtos/atualizarJogador.dto';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name);
  private jogadores: Jogador[] = [];

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado)
      throw new BadRequestException(
        `O jogador com o email ${email} já foi cricado!`,
      );

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: String,
    atualizarJogador: AtualizarJogador,
  ): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `O jogador com o id ${_id} não foi encontrado!`,
      );

    await this.jogadorModel.findOneAndUpdate({ $set: atualizarJogador }).exec();
    return this.consultarJogadoresPorEmail(_id);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPorEmail(_id: String): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${_id} não encontrado!`);
    }
    return jogadorEncontrado;
  }

  async deletarJogadorPorEmail(_id: String): Promise<any> {
    return (await this.jogadorModel.deleteOne({ _id }).exec()).ok;
  }
}

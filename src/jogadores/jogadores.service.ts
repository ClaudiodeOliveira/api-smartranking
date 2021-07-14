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
    email: String,
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(
        `O jogador com o email ${email} não foi encontrado!`,
      );

    await this.jogadorModel.findOneAndUpdate({ $set: criarJogadorDto }).exec();
    return this.consultarJogadoresPorEmail(email);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPorEmail(email: String): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `Jogador com e-mail ${email} não encontrado!`,
      );
    }
    return jogadorEncontrado;
  }

  async deletarJogadorPorEmail(email: String): Promise<any> {
    return await (
      await this.jogadorModel.deleteOne({ email }).exec()
    ).ok;
  }
}

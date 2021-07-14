import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interfaces';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParamentrosPipe } from './pipes/jogadores-validacao-paramentros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:email')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
    @Param('email', JogadoresValidacaoParamentrosPipe) email: String,
  ): Promise<Jogador> {
    return await this.jogadoresService.atualizarJogador(email, criarJogadorDto);
  }

  @Get('/:email')
  async consutarJogador(
    @Param('email', JogadoresValidacaoParamentrosPipe) email: string,
  ): Promise<Jogador> {
    if (email) {
      return await this.jogadoresService.consultarJogadoresPorEmail(email);
    }
  }

  @Get()
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:email')
  async deletarJogadorPorEmail(
    @Param('email', JogadoresValidacaoParamentrosPipe) email: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogadorPorEmail(email);
  }
}

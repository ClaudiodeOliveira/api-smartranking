import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CriarCategoriaDTO } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadorService: JogadoresService,
  ) {}

  async criarCategorias(
    criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDTO;

    const categoriaEncotrado = await this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (categoriaEncotrado)
      throw new BadRequestException(
        `A categoria ${categoria} já está cadastrada`,
      );

    const categoriaCriada = new this.categoriaModel(criarCategoriaDTO);
    return await categoriaCriada.save();
  }

  async consutarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().exec();
  }

  async consutarCategoriasPorCategoria(categoria: String): Promise<Categoria> {
    const categotiaEncontrada = this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categotiaEncontrada)
      throw new NotFoundException(
        `A categoria ${categoria} não foi encontrada!!!`,
      );
    return categotiaEncontrada;
  }

  async deletarCategoria(categoria: String): Promise<void> {
    const categoriaEncontrada = this.categoriaModel
      .findOne({ categoria })
      .exec();
    if (!categoriaEncontrada)
      throw new NotFoundException(`Categoria ${categoria} não foi encontrada.`);
    this.categoriaModel.deleteOne({ categoria }).exec();
  }

  async atribuirJagadorNaCategoria(params: String[]): Promise<Categoria> {
    const idJogador = params['_id'];
    const categoria = params['categoria'];

    const jogador = this.jogadorService.consultarJogadoresPorId(idJogador);

    if (!jogador) throw new BadRequestException(`A jogador não foi encontrada!!`);

    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

    if (!categoriaEncontrada) throw new BadRequestException(`A categoria não foi encontrada!!`);

    const jogadorJaNacategoria = await this.categoriaModel.find({ categoria }).where('jogadores').in(idJogador).exec();

    if (jogadorJaNacategoria.length > 0) throw new BadRequestException(`Jogador ${jogadorJaNacategoria} já está nessa categoria!!!`);
    
    categoriaEncontrada.jogadores.push(idJogador);

    return this.categoriaModel.findOneAndUpdate({ categoria },{ $set: categoriaEncontrada });
  }
}

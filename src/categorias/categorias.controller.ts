import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDTO } from './dtos/criarCategoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDTO: CriarCategoriaDTO,
  ): Promise<Categoria> {
    return await this.categoriaService.criarCategorias(criarCategoriaDTO);
  }

  @Get()
  async consultarCategorias(): Promise<Array<Categoria>> {
    return this.categoriaService.consutarCategorias();
  }

  @Get('/:categoria')
  @UsePipes(ValidationPipe)
  async consultarCategoria(
    @Param('categoria') categoria: String,
  ): Promise<Categoria> {
    return this.categoriaService.consutarCategoriasPorCategoria(
      categoria.toUpperCase(),
    );
  }

  @Delete('/:categoria')
  @UsePipes(ValidationPipe)
  async deletarCategoria(@Param('categoria') categoria: String): Promise<void> {
    this.categoriaService.deletarCategoria(categoria);
  }

  @Put('/:_id/:categoria')
  @UsePipes(ValidationPipe)
  async addJogadorNaCategoria(@Param() params: String[]): Promise<Categoria> {
    return await this.categoriaService.atribuirJagadorNaCategoria(params);
  }
}

import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';

export class CriarCategoriaDTO {
  @IsString()
  @IsNotEmpty()
  readonly categoria: String;

  @IsString()
  @IsNotEmpty()
  descricao: String;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}

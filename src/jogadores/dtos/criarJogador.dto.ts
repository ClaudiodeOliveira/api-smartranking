import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {

  readonly telefone: string;
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly nome: string;
}

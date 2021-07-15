import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDto {

  readonly telefone: String;
  @IsEmail()
  readonly email: String;
  @IsNotEmpty()
  readonly nome: String;
}

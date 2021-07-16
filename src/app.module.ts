import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasService } from './categorias/categorias.service';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@localhost:27017/node?authSource=admin&authMechanism=SCRAM-SHA-1',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      },
    ),
    JogadoresModule,
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/db.config';

@Module({
  imports: [
    UsersModule,
    RecipesModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(config(), { autoCreate: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

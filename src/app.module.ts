import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from './db.config';
import { User } from './users/User.model';

@Module({
  imports: [
    UsersModule,
    RecipesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    MongooseModule.forRoot(config(), { autoCreate: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

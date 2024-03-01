import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtAuthGuard } from './auth/guards/jwt.guards';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    ConfigModule.forRoot(),//configuraçao da env
    MongooseModule.forRoot(process.env.DATABASE_URL),//conectar no banco mongo
    AuthModule, 
    UserModule, ProductModule,
  ],
  controllers: [],
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard}//blindar sistema
  ],
})
export class AppModule {}


//o nest trabalha sempre com module
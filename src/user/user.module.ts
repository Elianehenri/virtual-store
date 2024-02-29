import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: 
    [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],//criar tabela que preciso neste module
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule, UserService]//expertar pra que alguem possa usar 
})
export class UserModule {}

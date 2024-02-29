/* eslint-disable prettier/prettier */
import {Injectable, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard} from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/ispublic.decorator';



//guards pra blindar nossas requisoes
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(private reflector: Reflector){
        super();//class pai 
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,[context.getHandler(), context.getClass()]);

        if(isPublic){
            return true;
        }
        //se nao for publico
        const canActivate = super.canActivate(context);

        if(typeof canActivate === 'boolean'){
            return canActivate;
        }

        const canActivatePromise = canActivate as Promise<boolean>;

        return canActivatePromise.catch(error => {
            if(error && error.message){
                throw new UnauthorizedException(error.message);
            }

            throw new UnauthorizedException();
        });
    }
}
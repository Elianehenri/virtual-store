/* eslint-disable prettier/prettier */
import {SetMetadata} from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);// esse decoratr indica se a rota é pubica ou nao 

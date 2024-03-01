import { Controller, Get, Request, BadRequestException, HttpStatus, HttpCode, Body, Put, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { UserMessagesHelper } from './helpers/messages.helper';

@Controller('user')
export class UserController {
    constructor(private readonly userSerice:UserService){}

    @Get()
    async getUser(@Request() req){
        const {userId} = req?.user;
        const user = await this.userSerice.getUserById(userId);

        if(!user){
            throw new BadRequestException(UserMessagesHelper.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            id: user._id
        }
    }
    //alterar dados
    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto: UpdateUserDto){
        const {userId} = req?.user;
        await this.userSerice.updateUser(userId, dto);
    }
//deletar usuario
    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteUser(@Request() req){
        const {userId} = req?.user;
        await this.userSerice.deleteUser(userId);
    }
}

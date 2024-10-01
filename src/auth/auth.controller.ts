import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { authSignUp } from './authDto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	


	@Post("register")
	@UseInterceptors(FileInterceptor('diploma'))
	async signUp(@Body() signUpDto: authSignUp, @UploadedFile() file: any) {
		if (signUpDto.userType === 'COACH' && !file) {
			throw new Error('Diploma is required for coaches');
		}
		const diplomaBuffer = file ? file.buffer : null;
		return this.authService.signUp({ ...signUpDto, diplomaBuffer });
	}
}

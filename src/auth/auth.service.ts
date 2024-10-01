import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { authSignUp } from "./authDto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(username: string, pass: string): Promise<any> {
		const user = await this.userService.getUser(username);

		if (!user || !(await bcrypt.compare(pass, user.password))) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, username: user.userName };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signUp(signUpDto: authSignUp & { diplomaBuffer?: Buffer }): Promise<any> {
		const user = await this.userService.createUserAccount(signUpDto);
		const payload = { sub: user.id, username: user.userName };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";

import { ApiDelete, ApiGet, ApiPatch, ApiPost } from "@decorators/index";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { UserEntity } from "./entities/user.entity";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Create a new user
	 */
	@Post()
	@ApiPost({ type: UserEntity })
	async create(@Body() createUserDto: CreateUserDto) {
		return new UserEntity(await this.usersService.create(createUserDto));
	}

	/**
	 * Get all users for a school
	 */
	@Get("school/:schoolId")
	@ApiGet({ type: [UserEntity] })
	async findAllBySchool(@Param("schoolId") schoolId: string) {
		const users = await this.usersService.findAllBySchool(schoolId);

		return users.map(user => new UserEntity(user));
	}

	/**
	 * Get a user by ID
	 */
	@Get(":id")
	@ApiGet({ type: UserEntity })
	async findOne(@Param("id") id: string) {
		return new UserEntity(await this.usersService.findOne(id));
	}

	/**
	 * Update a user by ID
	 */
	@Patch(":id")
	@ApiPatch({ type: UserEntity })
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return new UserEntity(
			await this.usersService.update(id, updateUserDto)
		);
	}

	/**
	 * Delete a user by ID
	 */
	@Delete(":id")
	@ApiDelete({ type: UserEntity })
	async remove(@Param("id") id: string) {
		return new UserEntity(await this.usersService.remove(id));
	}
}

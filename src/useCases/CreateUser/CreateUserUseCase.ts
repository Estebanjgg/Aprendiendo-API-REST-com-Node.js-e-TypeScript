import { User } from "../../entities/Users";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: ICreateUserRequestDTO) {

        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User alredy exists.');
        }
        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,

            },
            from: {
                name: 'Equipe do meu App',
                email: 'equipe@meuapp.com',
            },
            subject: 'Seja bem-vindo á plataforma',
            body: '<p>Voce ja pode Fazer login en nossa plataforma.</p>'
        })

    }
}
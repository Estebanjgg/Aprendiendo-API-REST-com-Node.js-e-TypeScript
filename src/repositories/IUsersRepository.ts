import { User } from "../entities/Users";

export interface IUserRepository{
    findByEmail(email: string): Promise<User>;
    save (User: User): Promise<void>;
}
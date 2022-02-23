import { Router } from "express";
import { CreateUserController } from "./useCases/CreateUser";


const router = Router()

router.post('/users', (request, response) => {
  return CreateUserController.handle(request, response);
});

export { router }
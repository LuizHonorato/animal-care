import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      username,
      password,
    });

    return response.json({ user, token });
  }
}

export default SessionsController;

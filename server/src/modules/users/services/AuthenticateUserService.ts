import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/data/entities/User';

interface IRequest {
  username: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  private users: User[] = [
    {
      id: '7875779f-ff8b-4c14-be56-2a783488937c',
      username: 'admin',
      password: 'admin',
      admin: true,
    },
    {
      id: '73aae88c-7296-4a3c-b56d-353c5ffaa5bd',
      username: 'tratador',
      password: 'tratador',
      admin: false,
    },
  ];

  public async execute({ username, password }: IRequest): Promise<IResponse> {
    const findUser = this.users.find(user => user.username === username);

    if (!findUser) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const passwordMatched = findUser.password === password;

    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ admin: findUser.admin }, secret, {
      subject: findUser.id,
      expiresIn,
    });

    delete findUser.password;

    return { user: findUser, token };
  }
}

export default AuthenticateUserService;

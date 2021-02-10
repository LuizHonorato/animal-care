import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Confinement from '../infra/data/entities/Confinement';
import IConfinementRepository from '../repositories/IConfinementRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindConfinementByIdService {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Confinement> {
    const confinement = await this.confinementsRepository.findById(id);

    if (!confinement) {
      throw new AppError('Confinement not found.');
    }

    return confinement;
  }
}

export default FindConfinementByIdService;

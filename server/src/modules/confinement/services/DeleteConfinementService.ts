import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IConfinementRepository from '../repositories/IConfinementRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteConfinementService {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const confinement = await this.confinementsRepository.findById(id);

    if (!confinement) {
      throw new AppError('Confinement not found.');
    }

    await this.confinementsRepository.delete(id);
  }
}

export default DeleteConfinementService;

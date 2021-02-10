import { inject, injectable } from 'tsyringe';
import Confinement from '../infra/data/entities/Confinement';
import IConfinementRepository from '../repositories/IConfinementRepository';

@injectable()
class FindAllConfinementsService {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute(): Promise<Confinement[]> {
    const confinements = await this.confinementsRepository.findAll();

    return confinements;
  }
}

export default FindAllConfinementsService;

import AppError from '@shared/errors/AppError';
import { isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Confinement from '../infra/data/entities/Confinement';
import IConfinementRepository from '../repositories/IConfinementRepository';

interface IRequest {
  nome: string;
  qtdBovinos: number;
  qtdEquinos: number;
  inicioConfinamento: Date;
  fimConfinamento: Date;
  usrCriacao: string;
}

@injectable()
class CreateConfinementService {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute({
    nome,
    qtdBovinos,
    qtdEquinos,
    inicioConfinamento,
    fimConfinamento,
    usrCriacao,
  }: IRequest): Promise<Confinement> {
    const currentDate = new Date(Date.now());

    if (
      isBefore(inicioConfinamento, currentDate) ||
      isBefore(fimConfinamento, currentDate)
    ) {
      throw new AppError('Cannot create a confinement in a past date');
    }

    if (qtdBovinos < 1) {
      throw new AppError('Minimum number of cattle is 1');
    }

    if (qtdEquinos < 1) {
      throw new AppError('Minimum quantity of horses is 1');
    }

    const confinement = await this.confinementsRepository.create({
      nome,
      qtdBovinos,
      qtdEquinos,
      inicioConfinamento,
      fimConfinamento,
      usrCriacao,
    });

    return confinement;
  }
}

export default CreateConfinementService;

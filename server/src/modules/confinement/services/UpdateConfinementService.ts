import AppError from '@shared/errors/AppError';
import { parseISO, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import Confinement from '../infra/data/entities/Confinement';
import IConfinementRepository from '../repositories/IConfinementRepository';

interface IRequest {
  id: string;
  nome: string;
  qtdBovinos: number;
  qtdEquinos: number;
  inicioConfinamento: string;
  fimConfinamento: string;
  usrCriacao: string;
}

@injectable()
class UpdateConfinementService {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute({
    id,
    nome,
    qtdBovinos,
    qtdEquinos,
    inicioConfinamento,
    fimConfinamento,
    usrCriacao,
  }: IRequest): Promise<Confinement> {
    const confinement = await this.confinementsRepository.findById(id);

    if (!confinement) {
      throw new AppError('Confinement not found.');
    }

    const currentDate = new Date(Date.now());

    const parsedInitialDate = parseISO(inicioConfinamento);
    const parsedFinalDate = parseISO(fimConfinamento);

    if (
      isBefore(parsedInitialDate, currentDate) ||
      isBefore(parsedFinalDate, currentDate)
    ) {
      throw new AppError('Cannot update a confinement in a past date');
    }

    if (qtdBovinos < 1) {
      throw new AppError('Minimum number of cattle is 1');
    }

    if (qtdEquinos < 1) {
      throw new AppError('Minimum quantity of horses is 1');
    }

    confinement.nome = nome;
    confinement.inicioConfinamento = parsedInitialDate;
    confinement.fimConfinamento = parsedFinalDate;
    confinement.qtdBovinos = qtdBovinos;
    confinement.qtdEquinos = qtdEquinos;
    confinement.usrCriacao = usrCriacao;

    const updatedConfinement = await this.confinementsRepository.save(
      confinement,
    );

    return updatedConfinement;
  }
}

export default UpdateConfinementService;

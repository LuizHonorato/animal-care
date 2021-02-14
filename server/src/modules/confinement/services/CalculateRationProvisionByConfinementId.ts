import AppError from '@shared/errors/AppError';
import { v4 as uuid } from 'uuid';
import { inject, injectable } from 'tsyringe';
import IConfinementRepository from '../repositories/IConfinementRepository';

interface IRequest {
  id: string;
}

interface RationProvisionProjection {
  id: string;
  day: number;
  qtdRationTotalPerDay: number;
  qtdRationToCattlePerDay: number;
  qtdRationToHorsePerDay: number;
}

interface IResponse {
  id: string;
  cattleTotal: number;
  horseTotal: number;
  weightTotal: number;
  weightByCattle: number;
  weightByHorse: number;
  rationProvisionTotal: number;
  rationProvisionByCattle: number;
  rationProvisionByHorse: number;
  rationProvisionProjectionPerDay: RationProvisionProjection[];
}

@injectable()
class CalculateRationProvisionByConfinementId {
  constructor(
    @inject('ConfinementsRepository')
    private confinementsRepository: IConfinementRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const confinement = await this.confinementsRepository.findById(id);

    if (!confinement) {
      throw new AppError('Confinement not found.');
    }

    // Parâmetros de referência
    const cattleWeight = 400;
    const horseWeight = 200;
    const cattleWeightGainPerDay = 1.1;
    const horseWeightGainPerDay = 0.8;

    // Calculando peso inicial do rebanho
    let cattleInitialWeight = confinement.qtdBovinos * cattleWeight;
    let horseInitialWeight = confinement.qtdEquinos * horseWeight;

    let rationProvisionByCattle = 0;
    let rationProvisionByHorse = 0;

    const rationProvisionProjectionPerDay: RationProvisionProjection[] = [];

    // Calculando período de confinamento
    const dateDifferenceInTime =
      confinement.fimConfinamento.getTime() -
      confinement.inicioConfinamento.getTime();

    let differenceInDays = dateDifferenceInTime / (1000 * 3600 * 24);

    const totalDays = differenceInDays;

    for (differenceInDays; differenceInDays > 0; differenceInDays--) {
      // Calculando quantidade total de trato e peso total projetado para bovinos
      rationProvisionByCattle = cattleInitialWeight * 0.005;
      cattleInitialWeight += cattleWeightGainPerDay;

      // Calculando quantidade total de trato e peso total projetado para equinos
      rationProvisionByHorse = horseInitialWeight * 0.005;
      horseInitialWeight += horseWeightGainPerDay;

      const day = totalDays - differenceInDays + 1;

      // Armazenando quantidade total de trato para bovinos e equinos por dia
      rationProvisionProjectionPerDay.push({
        id: uuid(),
        day,
        qtdRationToCattlePerDay: rationProvisionByCattle,
        qtdRationToHorsePerDay: rationProvisionByHorse,
        qtdRationTotalPerDay: rationProvisionByCattle + rationProvisionByHorse,
      });
    }

    // Trato total
    const rationProvisionTotal = rationProvisionProjectionPerDay.reduce(
      (acc, item) => acc + item.qtdRationTotalPerDay,
      0,
    );

    // Trato bovino total
    const rationProvisionTotalByCattle = rationProvisionProjectionPerDay.reduce(
      (acc, item) => acc + item.qtdRationToCattlePerDay,
      0,
    );

    // Trato equino total
    const rationProvisionTotalByHorse = rationProvisionProjectionPerDay.reduce(
      (acc, item) => acc + item.qtdRationToHorsePerDay,
      0,
    );

    return {
      id,
      cattleTotal: confinement.qtdBovinos,
      horseTotal: confinement.qtdEquinos,
      weightTotal: cattleInitialWeight + horseInitialWeight,
      weightByCattle: cattleInitialWeight,
      weightByHorse: horseInitialWeight,
      rationProvisionTotal,
      rationProvisionByCattle: rationProvisionTotalByCattle,
      rationProvisionByHorse: rationProvisionTotalByHorse,
      rationProvisionProjectionPerDay,
    };
  }
}

export default CalculateRationProvisionByConfinementId;

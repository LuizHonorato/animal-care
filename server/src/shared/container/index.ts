import { container } from 'tsyringe';
import ConfinementsRepository from '@modules/confinement/infra/data/repositories/ConfinementsRepository';
import IConfinementRepository from '@modules/confinement/repositories/IConfinementRepository';

container.registerSingleton<IConfinementRepository>(
  'ConfinementsRepository',
  ConfinementsRepository,
);

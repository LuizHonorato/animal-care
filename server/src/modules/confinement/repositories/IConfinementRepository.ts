import ICreateConfinementDTO from '../dtos/ICreateConfinementDTO';
import Confinement from '../infra/data/entities/Confinement';

export default interface IConfinementRepository {
  findAll(): Promise<Confinement[]>;
  findById(id: string): Promise<Confinement | undefined>;
  create(confinementData: ICreateConfinementDTO): Promise<Confinement>;
  save(confinement: Confinement): Promise<Confinement>;
  delete(id: string): Promise<void>;
}

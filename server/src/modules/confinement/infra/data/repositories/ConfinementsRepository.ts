import { uuid } from 'uuidv4';
import ICreateConfinementDTO from '@modules/confinement/dtos/ICreateConfinementDTO';
import IConfinementRepository from '@modules/confinement/repositories/IConfinementRepository';
import Confinement from '../entities/Confinement';

class ConfinementsRepository implements IConfinementRepository {
  private confinements: Confinement[] = [
    {
      id: 'c8b7a86f-b031-4e39-bf5a-7a8e73addc38',
      nome: 'Confinamento 1',
      qtdBovinos: 1,
      qtdEquinos: 1,
      inicioConfinamento: new Date(),
      fimConfinamento: new Date(2021, 5, 31),
      usrCriacao: 'Luiz',
    },
  ];

  public async findAll(): Promise<Confinement[]> {
    return this.confinements;
  }

  public async findById(id: string): Promise<Confinement | undefined> {
    return this.confinements.find(confinement => confinement.id === id);
  }

  public async create(
    confinementData: ICreateConfinementDTO,
  ): Promise<Confinement> {
    const confinement = new Confinement();

    Object.assign(confinement, { id: uuid() }, confinementData);

    this.confinements.push(confinement);

    return confinement;
  }

  public async save(confinement: Confinement): Promise<Confinement> {
    const findIndex = this.confinements.findIndex(
      findConfinement => findConfinement.id === confinement.id,
    );

    this.confinements[findIndex] = confinement;

    return confinement;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.confinements.findIndex(
      findConfinement => findConfinement.id === id,
    );

    this.confinements.splice(findIndex, 1);
  }
}

export default ConfinementsRepository;

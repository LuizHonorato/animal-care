import CreateConfinementService from '@modules/confinement/services/CreateConfinementService';
import DeleteConfinementService from '@modules/confinement/services/DeleteConfinementService';
import FindAllConfinementsService from '@modules/confinement/services/FindAllConfinementsService';
import FindConfinementByIdService from '@modules/confinement/services/FindConfinementByIdService';
import UpdateConfinementService from '@modules/confinement/services/UpdateConfinementService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ConfinementsController {
  async index(request: Request, response: Response): Promise<Response> {
    const findAllConfinementsService = container.resolve(
      FindAllConfinementsService,
    );

    const confinements = await findAllConfinementsService.execute();

    return response.json(confinements);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findConfinementById = container.resolve(FindConfinementByIdService);

    const confinement = await findConfinementById.execute({ id });

    return response.json(confinement);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      qtdBovinos,
      qtdEquinos,
      inicioConfinamento,
      fimConfinamento,
      usrCriacao,
    } = request.body;

    const createConfinementService = container.resolve(
      CreateConfinementService,
    );

    const confinement = await createConfinementService.execute({
      nome,
      qtdBovinos,
      qtdEquinos,
      inicioConfinamento,
      fimConfinamento,
      usrCriacao,
    });

    return response.json(confinement);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      nome,
      qtdBovinos,
      qtdEquinos,
      inicioConfinamento,
      fimConfinamento,
      usrCriacao,
    } = request.body;

    const updateConfinementService = container.resolve(
      UpdateConfinementService,
    );

    const confinement = await updateConfinementService.execute({
      id,
      nome,
      qtdBovinos,
      qtdEquinos,
      inicioConfinamento,
      fimConfinamento,
      usrCriacao,
    });

    return response.json(confinement);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteConfinementService = container.resolve(
      DeleteConfinementService,
    );

    await deleteConfinementService.execute({ id });

    return response.status(204).json();
  }
}

export default ConfinementsController;

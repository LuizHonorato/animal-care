import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CalculateRationProvisionByConfinementId from '@modules/confinement/services/CalculateRationProvisionByConfinementId';

class RationProvisionController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const calculateRationProvisionService = container.resolve(
      CalculateRationProvisionByConfinementId,
    );

    const rationProvision = await calculateRationProvisionService.execute({
      id,
    });

    return response.json(rationProvision);
  }
}

export default RationProvisionController;

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ConfinementsController from '../controllers/ConfinementsController';
import RationProvisionController from '../controllers/RationProvisionController';

const confinementsRouter = Router();
const confinementsController = new ConfinementsController();
const rationProvisionController = new RationProvisionController();

confinementsRouter.get('/', confinementsController.index);

confinementsRouter.get('/:id', confinementsController.show);

confinementsRouter.get('/provisions/:id', rationProvisionController.show);

confinementsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      qtdBovinos: Joi.number().required(),
      qtdEquinos: Joi.number().required(),
      inicioConfinamento: Joi.string().required(),
      fimConfinamento: Joi.string().required(),
      usrCriacao: Joi.string().required(),
    },
  }),
  confinementsController.create,
);

confinementsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      nome: Joi.string().required(),
      qtdBovinos: Joi.number().required(),
      qtdEquinos: Joi.number().required(),
      inicioConfinamento: Joi.string().required(),
      fimConfinamento: Joi.string().required(),
      usrCriacao: Joi.string().required(),
    },
  }),
  confinementsController.update,
);

confinementsRouter.delete('/:id', confinementsController.delete);

export default confinementsRouter;

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ConfinementsController from '../controllers/ConfinementsController';
import RationProvisionController from '../controllers/RationProvisionController';

import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';
import ensureUserAdmin from '../middlewares/ensureUserAdmin';

const confinementsRouter = Router();
const confinementsController = new ConfinementsController();
const rationProvisionController = new RationProvisionController();

confinementsRouter.get(
  '/',
  ensureUserAuthenticated,
  confinementsController.index,
);

confinementsRouter.get(
  '/:id',
  ensureUserAuthenticated,
  confinementsController.show,
);

confinementsRouter.get(
  '/provisions/:id',
  ensureUserAuthenticated,
  rationProvisionController.show,
);

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
  ensureUserAuthenticated,
  ensureUserAdmin,
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
  ensureUserAuthenticated,
  ensureUserAdmin,
  confinementsController.update,
);

confinementsRouter.delete(
  '/:id',
  ensureUserAuthenticated,
  ensureUserAdmin,
  confinementsController.delete,
);

export default confinementsRouter;

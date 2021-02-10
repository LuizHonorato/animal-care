import { Router } from 'express';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import confinementsRouter from '@modules/confinement/infra/http/routes/confinementes.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/confinements', confinementsRouter);

export default routes;

import express from 'express';
import { authenticate } from '../utils/auth';
import { createGbm, deleteGbm, getAllGbms, getGbmById, getGbmBySigla, updateGbm } from '../controllers/gbmController';


var gbmRoutes = express.Router();

gbmRoutes.get('/', authenticate, getAllGbms);
gbmRoutes.get('/:id', authenticate, getGbmById);
gbmRoutes.get('/:sigla', authenticate, getGbmBySigla);
gbmRoutes.post('/', authenticate, createGbm);
gbmRoutes.put('/:id', authenticate, updateGbm);
gbmRoutes.delete('/:id', authenticate, deleteGbm)

export default gbmRoutes;
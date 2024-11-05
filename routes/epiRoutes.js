import express from 'express';
import {
  cadastrarEPI, editarEPI, removerEPI, cadastrarFuncionario, editarFuncionario, removerFuncionario, registrarRetirada, registrarDevolucao, exibirHistorico
} from '../Controllers/Epi.js';

const router = express.Router();

router.post('/epis', cadastrarEPI);
router.put('/epis/:id', editarEPI);
router.delete('/epis/:id', removerEPI);

router.post('/funcionarios', cadastrarFuncionario);
router.put('/funcionarios/:id', editarFuncionario);
router.delete('/funcionarios/:id', removerFuncionario);

router.post('/retirada', registrarRetirada);
router.post('/devolucao', registrarDevolucao);

router.get('/historico', exibirHistorico);

export default router;

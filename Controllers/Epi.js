import  Epi from '../models/Epi.js'
import Devolucao  from '../models/Devolucao.js';
import Funcionario from '../models/Funcionario.js';
import Historico from '../models/Historico.js';
import Registro from '../models/Registro.js';


export const cadastrarEPI = async (req, res) => {
  try {
    const novoEPI = await EPI.create(req.body);
    res.status(201).json(novoEPI);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar EPI' });
  }
};

export const editarEPI = async (req, res) => {
  try {
    const { descricao } = req.body;
    const epi = await EPI.findOne({ where: { descricao } });

    if (!epi) {
      return res.status(404).json({ error: 'EPI não encontrado' });
    }

    await epi.update(req.body);
    res.status(200).json({ message: 'EPI atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar EPI' });
  }
};

export const removerEPI = async (req, res) => {
  try {
    const { descricao } = req.body; // Assume que você vai passar a descrição no corpo da requisição
    const deletado = await EPI.destroy({ where: { descricao } });

    if (!deletado) {
      return res.status(404).json({ error: 'EPI não encontrado' });
    }

    res.status(200).json({ message: 'EPI removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover EPI' });
  }
};

export const cadastrarFuncionario = async (req, res) => {
  try {
    const novoFuncionario = await Funcionario.create(req.body);
    res.status(201).json(novoFuncionario);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
};

export const editarFuncionario = async (req, res) => {
  try {
    const { nome } = req.body; 
    const funcionario = await Funcionario.findOne({ where: { nome } });

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    await funcionario.update(req.body);
    res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar funcionário' });
  }
};

export const removerFuncionario = async (req, res) => {
  try {
    const { nome } = req.body; // Assume que você vai passar o nome no corpo da requisição
    const deletado = await Funcionario.destroy({ where: { nome } });

    if (!deletado) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.status(200).json({ message: 'Funcionário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover funcionário' });
  }
};

export const registrarRetirada = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.body;

    const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
    const epi = await EPI.findOne({ where: { descricao: epiDescricao } });

    if (!funcionario || !epi) {
      return res.status(400).json({ error: 'Funcionário ou EPI não encontrado' });
    }

    const registro = await Registro.create({ funcionarioId: funcionario.id, epiId: epi.id, tipo: 'retirada' });
    res.status(201).json(registro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar retirada' });
  }
};

export const registrarDevolucao = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.body;

    const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
    const epi = await EPI.findOne({ where: { descricao: epiDescricao } });

    if (!funcionario || !epi) {
      return res.status(400).json({ error: 'Funcionário ou EPI não encontrado' });
    }

    const retiradaExistente = await Registro.findOne({
      where: { funcionarioId: funcionario.id, epiId: epi.id, tipo: 'retirada' }
    });

    if (!retiradaExistente) {
      return res.status(400).json({ error: 'Nenhuma retirada encontrada para este EPI e funcionário' });
    }

    await Historico.create({
      funcionarioId: funcionario.id,
      epiId: epi.id,
      tipo: 'devolucao',
      data: new Date()
    });

    await retiradaExistente.destroy();

    res.status(201).json({ message: 'Devolução registrada e retirada removida de Registro' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar devolução' });
  }
};

export const exibirHistorico = async (req, res) => {
  try {
    const { funcionarioNome, epiDescricao } = req.query;

    const filtros = {};
    if (funcionarioNome) {
      const funcionario = await Funcionario.findOne({ where: { nome: funcionarioNome } });
      if (funcionario) filtros.funcionarioId = funcionario.id;
    }
    if (epiDescricao) {
      const epi = await EPI.findOne({ where: { descricao: epiDescricao } });
      if (epi) filtros.epiId = epi.id;
    }

    const historico = await Historico.findAll({
      where: filtros,
      include: [
        { model: Funcionario, attributes: ['nome'] },
        { model: EPI, attributes: ['descricao'] }
      ]
    });

    res.status(200).json(historico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao exibir o histórico' });
  }
};

export interface TarefaDto {
  taskId?: string;
  titulo: string;
  descricao?: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  dataVencimento?: string;
  projetoId: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface ProjetoDto {
  projectId?: string;
  name: string;
  description?: string;
  dateCreate: string;
  dateUpdate: string;
  tasks: TarefaDto[];
}

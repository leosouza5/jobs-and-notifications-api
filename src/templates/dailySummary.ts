
export interface DailySummaryTemplateData {
  name: string;
  date: string;
  tasksCompleted: number;
  tasksPending: number;
}

export function dailySummaryTemplate({ name, date, tasksCompleted, tasksPending }: DailySummaryTemplateData) {
  return {
    subject: `Resumo Diário - ${date}`,
    html: `
      <div>
        <h2>Resumo Diário</h2>
        <p>Olá, ${name}. Aqui está o resumo das suas atividades para o dia ${date}:</p>
        <ul>
          <li>Tarefas concluídas: <strong>${tasksCompleted}</strong></li>
          <li>Tarefas pendentes: <strong>${tasksPending}</strong></li>
        </ul>
        <p>Continue o bom trabalho!</p>
      </div>
    `,
    text: `Resumo Diário (${date}) para ${name}: ${tasksCompleted} tarefas concluídas, ${tasksPending} pendentes.`,
  };
}

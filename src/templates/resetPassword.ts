export interface ResetPasswordTemplateData {
  name: string;
  code: string;
}

export function resetPasswordTemplate({ name, code }: ResetPasswordTemplateData) {
  return {
    subject: "Redefinicao de senha",
    html: `
      <div>
        <h2>Redefinicao de senha</h2>
        <p>Ola, ${name}.</p>
        <p>Recebemos uma solicitacao para redefinir sua senha.</p>
        <p>Use o codigo abaixo para continuar:</p>
        <p><strong>${code}</strong></p>
        <p>Se voce nao solicitou essa redefinicao, ignore este e-mail.</p>
      </div>
    `,
    text: `Ola, ${name}. Recebemos uma solicitacao para redefinir sua senha. Codigo: ${code}. Se voce nao solicitou essa redefinicao, ignore este e-mail.`,
  };
}

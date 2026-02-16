
export interface AccountLockedTemplateData {
  name: string;
}

export function accountLockedTemplate({ name }: AccountLockedTemplateData) {
  return {
    subject: `Alerta de Segurança: Conta Bloqueada`,
    html: `
      <div>
        <h2>Olá, ${name}.</h2>
        <p>Detectamos atividades suspeitas e sua conta foi temporariamente bloqueada por segurança.</p>
        <p>Por favor, entre em contato com o suporte para desbloquear sua conta.</p>
      </div>
    `,
    text: `Olá, ${name}. Detectamos atividades suspeitas e sua conta foi temporariamente bloqueada. Entre em contato com o suporte.`,
  };
}

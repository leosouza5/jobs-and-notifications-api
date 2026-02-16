export interface WelcomeTemplateData {
  name: string
}

export function welcomeTemplate({ name }: WelcomeTemplateData) {
  return {
    subject: `Bem-vindo, ${name}!`,
    html: `
      <div>
        <h2>Ola, ${name}!</h2>
        <p>Sua conta foi criada com sucesso.</p>
      </div>
    `,
    text: `Ola, ${name}! Sua conta foi criada com sucesso.`,
  }
}

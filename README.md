# 🍽️ Receitas de Despensa — Front-end

Interface web desenvolvida em **Angular** como projeto de conclusão de curso, consumindo a API REST do back-end para oferecer uma experiência completa de descoberta e gestão de receitas.

> 🔗 Back-end: [Projeto-Aplicado-em-Desenvolvimento-de-Sistemas](https://github.com/diaraujo115/Projeto-Aplicado-em-Desenvolvimento-de-Sistemas)

---

## 📋 Funcionalidades

- Listagem, busca e leitura de receitas
- Visualização da análise nutricional automática de cada receita
- Filtro de receitas pelos ingredientes disponíveis na sua despensa
- Avaliação e comentários em receitas
- Criação de conta de usuário e login
- Criação e gerenciamento de receitas próprias
- Favoritar e salvar receitas

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | Angular 20 |
| Linguagem | TypeScript |
| Estilização | CSS |
| Comunicação com API | HttpClient (Angular) |
| Autenticação | JWT via interceptors |

---

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`
- [Back-end rodando](https://github.com/diaraujo115/Projeto-Aplicado-em-Desenvolvimento-de-Sistemas) em `http://localhost:8080`

### Passos

```bash
# Clone o repositório
git clone https://github.com/diaraujo115/Projeto-Aplicado-em-Desenvolvimento-de-Sistemas-Front.git
cd Projeto-Aplicado-em-Desenvolvimento-de-Sistemas-Front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
ng serve
```

Acesse em `http://localhost:4200`.

---

## 🗂️ Estrutura do Projeto

```
src/
└── app/
    ├── components/    # Componentes reutilizáveis (cards, forms, etc.)
    ├── pages/         # Páginas da aplicação
    ├── services/      # Chamadas à API REST
    ├── models/        # Interfaces TypeScript
    ├── guards/        # Proteção de rotas autenticadas
    └── interceptors/  # Injeção automática do token JWT
```

---

## 🔗 Integração com o Back-end

O front-end consome a API REST do back-end Java/Spring Boot. Certifique-se de que o back-end esteja rodando antes de iniciar o front-end. A URL da API pode ser configurada em `src/environments/environment.ts`.

---

## 👨‍💻 Autor

**Diego Araújo**
[LinkedIn](https://linkedin.com/in/diego-araujo115) • [GitHub](https://github.com/diaraujo115)

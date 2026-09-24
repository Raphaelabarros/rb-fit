# RB Fit

App pessoal de treino no estilo BeFit, hospedado no GitHub Pages e com os dados salvos automaticamente num repositório privado.

## Como funciona

São **dois repositórios**:

| Repositório | Visibilidade | O que guarda |
|---|---|---|
| `meu-treino` | Público (exigido pelo GitHub Pages gratuito) | Só o código do app. Nenhum dado seu. |
| `meu-treino-dados` | **Privado** | `dados.json` (fichas, treinos e medidas), `fotos/` (fotos dos treinos) e `aparelhos/` (fotos dos aparelhos). |

Cada vez que você finaliza um treino, registra uma medida ou muda uma ficha, o app faz um commit no repositório de dados. Sem internet, ele guarda no celular e envia quando a conexão voltar.

## Passo a passo

### 1. Repositório do app (público)
1. No GitHub, crie um repositório **público** chamado `meu-treino`.
2. Faça upload de **todos os arquivos desta pasta**: `index.html`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` e este `README.md`.
3. Vá em **Settings → Pages**. Em *Source*, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e clique em **Save**.
4. Em 1 ou 2 minutos o app fica no ar em `https://SEU-USUARIO.github.io/meu-treino/`.

### 2. Repositório de dados (privado)
1. Crie outro repositório, **privado**, chamado `meu-treino-dados`.
2. Marque **Add a README file**, para ele já nascer com a branch `main`.

### 3. Token de acesso
1. Acesse **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Preencha assim:
   - **Token name:** `meu-treino`
   - **Expiration:** o maior prazo que aparecer (ao vencer, gere outro e cole de novo no app)
   - **Repository access:** *Only select repositories* → `meu-treino-dados`
   - **Permissions → Repository permissions → Contents:** *Read and write*
3. Clique em **Generate token** e copie o código `github_pat_…`.

### 4. No iPhone
1. Abra `https://SEU-USUARIO.github.io/meu-treino/` no **Safari**.
2. Vá em **Perfil → Sincronização (GitHub)** e preencha seu usuário, `meu-treino-dados` e o token. Toque em **Testar e salvar**.
3. Toque em **Compartilhar → Adicionar à Tela de Início**.

Pronto. Em outro aparelho, é só repetir o passo 4 que os dados aparecem.

## Atualizar o app
Quando houver uma versão nova do `index.html`, substitua o arquivo no repositório `meu-treino`. Os dados não são afetados.

## Créditos
- Animações 3D: [ExerciseDB](https://exercisedb.dev), versão gratuita, uso pessoal e não comercial, com crédito.
- Ilustrações: [Everkinetic](https://github.com/everkinetic/data), licença CC BY-SA 4.0.
- Fotos de aparelhos: [Wikimedia Commons](https://commons.wikimedia.org), com autor e licença exibidos em cada foto.

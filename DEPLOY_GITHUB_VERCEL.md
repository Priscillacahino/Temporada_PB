# Temporada PB — GitHub e Vercel

## 1. Criar o repositório no GitHub

Nome sugerido:

`Temporada_PB`

Descrição sugerida:

`PWA independente para encontrar hospedagens de curta temporada no eixo João Pessoa, Litoral Sul e Conde/PB.`

Crie o repositório vazio, de preferência sem adicionar README, .gitignore ou licença pelo GitHub, pois esses arquivos já existem no projeto.

## 2. Colocar esta pasta em Downloads

A pasta deve ficar, por exemplo, em:

`C:\Users\SEU_USUARIO\Downloads\Temporada_PB`

## 3. Enviar pelo PowerShell

Abra o PowerShell e execute, trocando apenas o endereço do repositório pelo endereço criado na sua conta:

```powershell
cd "$HOME\Downloads\Temporada_PB"

git init
git branch -M main

git add .
git commit -m "Versão inicial do Temporada PB"

git remote add origin https://github.com/SEU_USUARIO/Temporada_PB.git
git push -u origin main
```

## 4. Conferir

Execute:

```powershell
git status
git remote -v
```

O resultado esperado no `git status` é:

`nothing to commit, working tree clean`

## 5. Publicar no Vercel

Depois que o repositório estiver no GitHub:

1. Entrar no Vercel.
2. Add New → Project.
3. Importar `Temporada_PB`.
4. Framework Preset: `Other`.
5. Root Directory: raiz do repositório.
6. Build Command: deixar vazio.
7. Output Directory: deixar vazio.
8. Deploy.

Como é um site estático/PWA, não há backend nem variáveis obrigatórias nesta versão.

## Estrutura principal

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `sw.js`
- `data/imoveis.json`
- `data/meta.json`
- `icons/`
- `TESTE_PWA.md`
- `README.md`

## Observação

O app não realiza reservas nem pagamentos. Os anúncios permanecem vinculados às respectivas fontes originais.

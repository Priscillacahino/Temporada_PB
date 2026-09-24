# Atualização V8 — Amigos da Vênus

Esta atualização transforma a identidade pública do projeto de **Temporada PB** para **Amigos da Vênus**.

## Alterações
- Nova marca: Amigos da Vênus.
- Estética Granola / Crunchy / Casual Boho.
- Casa de Praia Vênus como primeira opção de referência.
- 27 hospedagens mantidas como alternativas independentes.
- Nova mensagem de acolhimento.
- Aviso claro de ausência de vínculo comercial com as demais hospedagens.
- Manifesto PWA atualizado.
- Service Worker com cache V8.
- README e relatório de testes atualizados.

## Aplicação pelo PowerShell

Descompacte este ZIP em Downloads e copie os arquivos sobre a pasta do repositório local.

A pasta do repositório usada anteriormente foi:

C:\Users\mctam\Downloads\Temporada_PB_upload\Temporada_PB

Depois execute:

```powershell
cd "$HOME\Downloads\Temporada_PB_upload\Temporada_PB"

git status
git add .
git commit -m "Atualiza identidade para Amigos da Vênus V8"
git push origin main
git status
```

O Vercel deve iniciar um novo deploy automaticamente após o push.

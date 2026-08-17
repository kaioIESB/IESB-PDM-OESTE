# Estrutura do Projeto

- **package.json**: manifesto do projeto — nome, versão, dependências, scripts e metadados.
- **package-lock.json**: trava as versões exatas de cada dependência para garantir reprodutibilidade entre máquinas.
- **App.js**: componente principal da interface — é onde a tela do app é montada.
- **app.json**: configurações do Expo (ícone, splash, orientação, permissões, versão do app).
- **assets/**: arquivos estáticos (ícones, imagens, splash screen).
- **node_modules/**: pasta onde ficam todas as dependências instaladas via npm install.
- **.gitignore**: lista de arquivos/pastas que o Git deve ignorar (ex: node_modules).
- **.expo/**: arquivos temporários e metadados gerados pelo Expo ao rodar o projeto (não deve ser versionado).
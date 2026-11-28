# Teleprompter SMK

Teleprompter com controle remoto. O tablet fica na frente da câmera mostrando o roteiro, e o computador ou celular comanda tudo em tempo real.

## Como usar

Link único: https://smk-agency.github.io/teleprompter/

1. No tablet, abra o link e escolha **Tablet**.
2. No celular (ou computador), abra o mesmo link e escolha **Celular**.
3. Quando aparecer "Tablet conectado" no controle, é só gravar.

## Marcar o que já foi gravado

- Na lista, o quadrado à esquerda de cada roteiro marca ou desmarca **gravado**. Em cima aparece "3 de 8 gravados".
- No editor, o botão **Marcar gravado** faz o mesmo.
- No controle remoto, **✓ Gravado, próximo roteiro** marca o roteiro que está no tablet e já envia o próximo da lista que ainda não foi gravado.
- A ordem da lista é a de criação/importação e não muda quando você edita um roteiro.

## Importar vários roteiros

Em **Roteiros › Importar › Escolher arquivos**, selecione vários arquivos de uma vez (Word `.docx`, PDF ou `.txt`).
Cada arquivo vira um roteiro, em ordem de nome (Short 01, Short 02…). O nome do arquivo vira o nome do roteiro;
se a primeira linha do arquivo repete esse nome, ela vira o título e sai do texto lido.
Os leitores de Word e PDF só são baixados quando você escolhe um arquivo desses. PDF escaneado (imagem) não tem texto para ler.

Também dá pra colar um texto com vários roteiros juntos. Nesse caso o app separa por:

- uma linha só com `---` (ou `***`, `===`) entre os roteiros;
- títulos no começo de cada um: `Roteiro 1`, `Vídeo 2: Nome`, `Reels 3`, `# Nome`;
- ou duas linhas em branco seguidas.

Antes de salvar aparece a lista: dá pra renomear e desmarcar.

## Firebase

Usa o mesmo projeto do SMK OS (`smk-agency`), com login anônimo, nesta área do Firestore:

```
teleprompter/smk/scripts/{id}     roteiros
teleprompter/smk/live/tablet      estado do tablet (posição, velocidade, ajustes)
teleprompter/smk/live/controller  sinal de vida do controle
teleprompter/smk/live/cmd         último comando enviado ao tablet
```

Se o controle mostrar "Firebase recusou o acesso", adicione esta regra no console do Firebase
(Firestore › Regras), dentro de `match /databases/{database}/documents { ... }`, sem apagar as regras do SMK OS:

```
match /teleprompter/{doc=**} {
  allow read, write: if request.auth != null;
}
```

E confira em Authentication › Settings › Authorized domains se `smk-agency.github.io` está na lista.

## Publicação

GitHub Pages, branch `main`, pasta raiz. Um único `index.html`, sem build.

# Teleprompter SMK

Teleprompter com controle remoto. O tablet fica na frente da câmera mostrando o roteiro, e o computador ou celular comanda tudo em tempo real.

## Como usar

1. No tablet, abra o site e escolha **Tablet** (ou abra direto com `#tablet` no fim do endereço).
2. No computador ou celular, abra o mesmo site e escolha **Controle** (ou `#controle`).
3. Quando aparecer "Tablet conectado" no controle, é só gravar.

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

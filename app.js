let titulosList = document.querySelector("#book-list");
function renderbook(doc) {
  let li = document.createElement("li");
  let nome = document.createElement("span");
  let cpf = document.createElement("span");
  let data_nascimento = document.createElement("span");
  let email = document.createElement("span");
  let rg = document.createElement("span");
  let telefone_aluno = document.createElement("span");
  let telefone_responsavel = document.createElement("span");
  let excluir = document.createElement("div");

  excluir.textContent = "x";

  li.setAttribute("data-id", doc.id);
  cpf.textContent = doc.data().cpf;
  data_nascimento.textContent = doc.data().data_nascimento;
  email.textContent = doc.data().email;
  nome.textContent = doc.data().nome;
  rg.textContent = doc.data().rg;
  telefone_aluno.textContent = doc.data().telefone_aluno;
  telefone_responsavel.textContent = doc.data().telefone_responsavel;

  li.appendChild(nome);
  li.appendChild(data_nascimento);
  li.appendChild(cpf);
  li.appendChild(rg);
  li.appendChild(email);
  li.appendChild(telefone_aluno);
  li.appendChild(telefone_responsavel);
  li.appendChild(excluir);

  excluir.addEventListener("click", (event) => {
    event.stopPropagation();
    let id = event.target.parentElement.getAttribute("data-id");

    db.collection("BD3-NoSQL")
      .doc(id)
      .delete()
      .then(() => {
        window.location.reload();
      });
  });
  titulosList.appendChild(li);
}

db.collection("BD3-NoSQL")
  .get()
  .then((snepshot) => {
    snepshot.docs.forEach((doc) => {
      renderbook(doc);
    });
  });

const form = document.querySelector("#add-book-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("BD3-NoSQL")
    .add({
      cpf: form.cpf.value,
      data_nascimento: form.data_nascimento.value,
      email: form.email.value,
      nome: form.nome.value,
      rg: form.rg.value,
      telefone_aluno: form.telefone_aluno.value,
      telefone_responsavel: form.telefone_responsavel.value,
    })
    .then(() => {
      form.cpf.value = "";
      form.data_nascimento.value = "";
      form.email.value = "";
      form.nome.value = "";
      form.rg.value = "";
      form.telefone_aluno.value = "";
      form.telefone_responsavel.value = "";
      window.location.reload();
    });
});

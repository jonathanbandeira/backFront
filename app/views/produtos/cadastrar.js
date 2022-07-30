const url = "http://localhost:3001/produtos";
const loadingElement = document.querySelector("#loading");
const btnSalvar = document.querySelector("button");

btnSalvar.addEventListener("click", async (e) => {
  e.preventDefault();
  if (await salvarCategoria()) {
    location.assign("/index.html");
  } else {
    alert("Não foi possível salvar o produto!");
  }
});

async function salvarCategoria() {
  const form = document.querySelector("form");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: form.nome.value,
      descricao: form.descricao.value,
      preco: Number(form.preco.value.toString().replace(",", ".")),
      categoriaId: Number(form.categoriaId.value),
    }),
  });
  return response.status === 201;
}

async function carregarCategorias() {
  loadingElement.style.display = "block";
  const response = await fetch("http://localhost:3001/categorias");
  const dadosJson = await response.json();
  loadingElement.style.display = "none";
  const select = document.querySelector("#categoriaId");
  dadosJson.forEach((c) => {
    select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
  });
}

carregarCategorias();

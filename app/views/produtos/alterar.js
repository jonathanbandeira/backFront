let url = "http://localhost:3001/produtos/{id}";
const loadingElement = document.querySelector("#loading");
const btnSalvar = document.querySelector("button");
const form = document.querySelector("form");

const parametrosUrl = new URLSearchParams(window.location.search);
const idProduto = parametrosUrl.get("id") ?? "0";
url = url.replace("{id}", idProduto);

btnSalvar.addEventListener("click", async (e) => {
  e.preventDefault();
  if (await salvarProduto()) {
    location.assign("/index.html");
  } else {
    alert("Não foi possível salvar o produto!");
  }
});

async function salvarProduto() {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //nome: form.nome.value,
      descricao: form.descricao.value,
      preco: Number(form.preco.value.toString().replace(",", ".")),
      categoriaId: Number(form.categoriaId.value),
    }),
  });
  return response.status === 200;
}

async function carregarCategorias(id) {
  loadingElement.style.display = "block";
  const response = await fetch("http://localhost:3001/categorias");
  const dadosJson = await response.json();
  loadingElement.style.display = "none";
  const select = document.querySelector("#categoriaId");
  dadosJson.forEach((c) => {
    select.innerHTML += `<option value="${c.id}" 
      ${c.id === id ? "selected" : ""}>${c.nome}</option>`;
  });
}

async function carregarProduto() {
  loadingElement.style.display = "block";
  const response = await fetch(url);
  const dadosJson = await response.json();
  loadingElement.style.display = "none";
  const spanNome = document.querySelector("#nome");
  spanNome.innerHTML = dadosJson.nome;
  form.preco.value = dadosJson.preco;
  form.descricao.value = dadosJson.descricao;
  carregarCategorias(dadosJson.categoriaId);
}

carregarProduto();

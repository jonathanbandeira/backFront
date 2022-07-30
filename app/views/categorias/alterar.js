let url = "http://localhost:3001/categorias/{id}";
const loadingElement = document.querySelector("#loading");
const btnSalvar = document.querySelector("button");
const form = document.querySelector("form");

const parametrosUrl = new URLSearchParams(window.location.search);
const idCategoria = parametrosUrl.get("id") ?? "0";
url = url.replace("{id}", idCategoria);

btnSalvar.addEventListener("click", async (e) => {
  e.preventDefault();
  if (await salvarCategoria()) {
    location.assign("/views/categorias/index.html");
  } else {
    alert("Não foi possível salvar a categoria!");
  }
});

async function salvarCategoria() {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: form.nome.value,
    }),
  });
  return response.status === 200;
}

async function carregarCategoria() {
  loadingElement.style.display = "block";
  const response = await fetch(url);
  const dadosJson = await response.json();
  loadingElement.style.display = "none";
  form.nome.value = dadosJson.nome;
}

carregarCategoria();

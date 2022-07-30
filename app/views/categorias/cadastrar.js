const url = "http://localhost:3001/categorias";
const loadingElement = document.querySelector("#loading");
const btnSalvar = document.querySelector("button");

btnSalvar.addEventListener("click", async (e) => {
  e.preventDefault();
  if (await salvarCategoria()) {
    location.assign("/views/categorias/index.html");
  } else {
    alert("Não foi possível salvar a categoria!");
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
    }),
  });
  return response.status === 201;
}

const url = "http://localhost:3001/produtos";
const loadingElement = document.querySelector("#loading");
const outputElement = document.querySelector("#output");

async function carregarProdutos() {
  loadingElement.style.display = "block";
  const response = await fetch(url);
  const dadosJson = await response.json();
  loadingElement.style.display = "none";
  outputElement.innerHTML = "";
  dadosJson.map((p) => {
    outputElement.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>${p.preco.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}</td>
                <td>
                    <a href="alterar.html?id=${p.id}" 
                      class="btn btn-primary btn-sm">
                      <i class="bi bi-pencil" title="Alterar"></i>
                    </a>
                    <button type="button" data-id="${p.id}" data-nome="${p.nome}" class="btn btn-danger btn-sm">
                      <i class="bi bi-trash" title="Excluir"></i>
                    </button> 
                </td>
            </tr>
        `;
  });
  await configurarExclusao();
}

async function configurarExclusao() {
  const botoes = document.querySelectorAll("button[data-id]");
  botoes.forEach((b) => {
    b.addEventListener("click", async (e) => {
      e.preventDefault();
      const nomeProduto = b.attributes["data-nome"].value;
      const idProduto = b.attributes["data-id"].value;
      if (confirm(`Deseja realmente excluir o produto ${nomeProduto}`)) {
        if (await excluirCategoria(idProduto)) {
          await carregarProdutos();
          alert("Produto excluído com sucesso!");
        } else {
          alert("Não foi possível excluir o produto.");
        }
      }
    });
  });
}

async function excluirCategoria(id) {
  const response = await fetch(`${url}/${id}`, { method: "DELETE" });
  return response.status === 200;
}

carregarProdutos();

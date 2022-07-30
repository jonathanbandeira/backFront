const url = "http://localhost:3001/categorias";
const loadingElement = document.querySelector("#loading");
const outputElement = document.querySelector("#output");

async function carregarCategorias() {
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
                <td>
                    <a href="alterar.html?id=${p.id}">Alterar</a>
                    <button type="button" data-id="${p.id}" data-nome="${p.nome}">Excluir</button> 
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
      const nomeCategoria = b.attributes["data-nome"].value;
      const idCategoria = b.attributes["data-id"].value;
      if (confirm(`Deseja realmente excluir a categoria ${nomeCategoria}?`)) {
        if (await categoriaTemProdutos(idCategoria)) {
          alert("Não é possível excluir uma categoria com produtos.");
        } else {
          if (await excluirCategoria(idCategoria)) {
            await carregarCategorias();
            alert("Categoria excluída com sucesso!");
          } else {
            alert("Não foi possível excluir a categoria.");
          }
        }
      }
    });
  });
}

async function excluirCategoria(id) {
  const response = await fetch(`${url}/${id}`, { method: "DELETE" });
  return response.status === 200;
}

async function categoriaTemProdutos(id) {
  const urlProdutosDaCategoria = 
    `http://localhost:3001/produtos?categoriaId=${id}`;
  const response = await fetch(urlProdutosDaCategoria);
  const dadosJson = await response.json();
  return dadosJson.length > 0;
}

carregarCategorias();

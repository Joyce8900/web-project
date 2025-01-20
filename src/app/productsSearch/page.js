// pages/searchProduto/index.js
export default function ProductForm() {
  return (
    <form action="/product">
      <label htmlFor="idTitleSearchKey">Título da Receita</label>
      <input id="idTitleSearchKey" name="titleSearchKey" />
      <button type="submit">Pesquisar</button>
    </form>
  )
}

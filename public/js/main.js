'use strict'

const Handlebars = require('handlebars')
const { request } = require('graphql-request')
const endpoint = 'http://localhost:3000/api'

const template = `
{{#with error}}
  There was an error: {{../error}}
{{/with}}
{{#each items}}
<div class="item">
  <h1>{{title}}</h1>
  {{#with authors}}
    <p> Autor : {{../authors}}</p>
  {{/with}}
  {{#with shortDescription }}
    <p> Descripción: {{../shortDescription}}</p>
  {{/with}}
  {{#with isbn}}
    <p> ISBN : {{../isbn}}</p>
  {{/with}}
  
</div>
{{/each}}
`
const templateData = Handlebars.compile(template)

async function search () {
  const query = `
    query generalSearch ($keyword: String!){
      searchBook(keyword: $keyword) {
        title
        authors
        shortDescription
        isbn
      }
    }
  `

  const data = { keyword: document.getElementById('search').value }
  let result, html

  try {
    result = await request(endpoint, query, data)
    result.searchBook.length > 0 
      ? html = templateData({ items: result.searchBook })
      : html = templateData({ items: [{title:"Sin resultados"}] });
  } catch (error) {
    html = templateData({ error: error })
  }

  document.getElementById('result').innerHTML = html
}

async function addBook() {
  const mutation = `
  mutation newbook($inputDate: BookInput!){
    addBook(input:$inputDate) {
      _id
      title
    }
  }
  `
  const inputDate = { inputDate:{
    title      : document.getElementById('add-title').value,
    authors    : [document.getElementById('add-author').value],
    categories : [document.getElementById('add-categoria').value],
    isbn       : document.getElementById('add-isbn').value}
  }
  let html

  try {
    await request(endpoint, mutation, inputDate)
    html = templateData({ items: [{title:"Libro guardado con éxito"}] });
  } catch (error) {
    html = templateData({ error: error })
  }
  document.getElementById('result').innerHTML = html
}

async function deleteBook() {
  const mutation = `
  mutation deletebook($isbn: String!){
    removeBook(isbn:$isbn)
  }
  `
  const Date = { isbn : document.getElementById('delete-isbn').value}
  let html

  try {
    await request(endpoint, mutation, Date)
    html = templateData({ items: [{title:"Libro eliminado con éxito"}] });
  } catch (error) {
    html = templateData({ error: error })
  }
  document.getElementById('result').innerHTML = html
}

async function editBook() {
  const mutation = `
  mutation editBook($isbn: String!,$inputDate: BookEditInput!){
    editBook(isbn:$isbn,input:$inputDate){
      _id
      title
      authors
    }
  }`
  const inputDate = { 
    isbn : document.getElementById('edit-isbn').value,
    inputDate:{
      title      : document.getElementById('edit-title').value,
      authors    : [document.getElementById('edit-author').value],
      categories : [document.getElementById('edit-categoria').value]}
  }
  let html

  try {
    await request(endpoint, mutation, inputDate)
    html = templateData({ items: [{title:"Libro editado con éxito"}] });
  } catch (error) {
    html = templateData({ error: error })
  }
  document.getElementById('result').innerHTML = html
}


window.onload = () => {
  document.getElementById('btn-search').addEventListener('click', search)
  document.getElementById('btn-add').addEventListener('click', addBook)
  document.getElementById('btn-delete').addEventListener('click', deleteBook)
  document.getElementById('btn-edit').addEventListener('click', editBook)
}
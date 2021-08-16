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
    <p>{{../authors}}</p>
  {{/with}}
  {{#with shortDescription }}
    <p>{{../shortDescription}}</p>
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

window.onload = () => {
  document.getElementById('btn-search').addEventListener('click', search)
}
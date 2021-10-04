const current = window.location.href
var products = []

urlParams = new URLSearchParams(window.location.search)
getParams = urlParams.get('params')

onload = () => {
  if (current.match('index')) {
    listProduct()
  } else {
    !getParams ? onFormProducts() : editProduct()
  }
}

listProduct = () => {
  products = JSON.parse(localStorage.getItem('products'))

  if (products != null && products.length != 0) {
    writeCardsProduct(products)
  } else {
    document.getElementById('notProducts').classList.remove('hidden')
  }
}

onFormProducts = () => {
  fillSelect()

  $('#btnNewProduct').click((event) => { newProduct() })
  $('#new').click((event) => { window.location.reload() })

  $('#ingredientList').selectpicker()
}

$('#return').click((event) => { window.history.back() })

// Função responsavel pelo registro de um novo producte no localStorage
newProduct = () => {  
  ingredients = document.getElementsByClassName("filter-option-inner-inner")[0]
  ingredients = ingredients.innerText
  document.getElementById('ingredients').value = `${ingredients}`

  function handleSubmit(event) {
    event.preventDefault()

    id = Math.random().toString().replace('0.', '')
    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    products = JSON.parse(localStorage.getItem('products'))

    if (products == null) {
      products = [{ id, data }]
      localStorage.setItem('products', JSON.stringify(products))
    } else {
      products.push({ id, data })
      localStorage.setItem('products', JSON.stringify(products))
    }    
    $("#loadingModal").modal()
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Essa função tem como objetivo filtrar Ingredientes
// e adicionar os itens ao select para criação de um Produto
fillSelect = () => {
  ingredients = JSON.parse(localStorage.getItem('ingredients'))
  
  if (ingredients != null) {
    ingredients.forEach(ingredient => {
      option = `<option>${ingredient.data.name}</option>`
      
      ele = document.createElement('option')
      ele.innerHTML = option
      document.getElementById('ingredientList').appendChild(ele.firstChild)
    })
  }
}

// Esta função identifica o producte selecionado e antes de
// redirecionar para a tela de edição. Os parametros são encriptados
// para não ficarem totalmente explicitos na url
getProduct = (id) => {
  products = JSON.parse(localStorage.getItem('products'))

  productId = products.findIndex((product) => product.id == id)
  productId = products[productId]

  window.location = `/src/views/Products/productForm.html?params=${ btoa( `${ JSON.stringify(productId) }` ) }`
}

// Esta função recebe e descriptografa os dados do produto com base 
// nos parametros passados na url e preenche o formulario
editProduct = () => {
  document.getElementById('label').innerHTML= 'Editar Produto'
  params = JSON.parse(atob(getParams))

  fillSelect()
  $('#ingredientList').selectpicker()

  document.getElementById('btnNewProduct').setAttribute('onClick', 'saveEdited()')
  document.getElementById('btnNewProduct').removeAttribute('id')

  document.getElementById('name').value = `${params.data.name}`
  document.getElementById('ingredientList').value = `${params.data.ingredients}`
}

// Essa função recupera os dados do formulario após alteração
// e realiza o update no LocalStorage
saveEdited = () => {
  $("#loadingModal").modal()
  function handleSubmit(event) {
    event.preventDefault()

    params = JSON.parse(atob(getParams))
    products = JSON.parse(localStorage.getItem('products'))

    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    productId = products.findIndex((product) => product.id == params.id)
    products[productId].data = data
  
    localStorage.setItem('products', JSON.stringify(products))
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Essa função identifica pelo id qual a posição do item no vetor
// remove o item e atualiza o vetor no LocalStorage
removeProduct = (id) => {
  products = JSON.parse(localStorage.getItem('products'))

  productId = products.findIndex((product) => product.id == id)
  products.splice(productId, 1)

  localStorage.setItem('products', JSON.stringify(products))

  $("#modalSuccess").modal()
  $('#return').click((event) => { window.location.reload() })
}
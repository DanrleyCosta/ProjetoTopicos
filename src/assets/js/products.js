const current = window.location.href
var products = []

onload = () => {
  if (current.match('index')) {
    listProduct()
  } else {
    onFormProducts()
  }
}

listProduct = () => {
  products = JSON.parse(localStorage.getItem('products'))

  if (products != null) {
    writeCardsProduct(products)
  } else {
    document.getElementById('notProducts').classList.remove('hidden')
  }
}

onFormProducts = () => {
  $('#btnNewProduct').click((event) => { newProduct() })

  $('#return').click((event) => { window.history.back() })

  $('#new').click((event) => { window.location.reload() })
}

// Função responsavel pelo registro de um novo ingrediente no localStorage
newProduct = () => {  
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

editProduct = () => {
  // TODO
}
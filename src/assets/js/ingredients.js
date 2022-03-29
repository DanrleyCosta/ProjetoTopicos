const current = window.location.href
var ingredients = []

urlParams = new URLSearchParams(window.location.search)
getParams = urlParams.get('params')

onload = () => {
  if (current.match('index')) {
    listIngredient()
  } else {
    !getParams ? onFormIngredients() : editIngredient()
  }
}

listIngredient = () => {
  ingredients = JSON.parse(localStorage.getItem('ingredients'))

  if (ingredients != null && ingredients.length != 0) {
    writeCardsIngredient(ingredients)
  } else {
    document.getElementById('notIngredients').classList.remove('hidden')
  }
}

onFormIngredients = () => {
  $('#btnNewIngredient').click((event) => { 
    !getParams ? newIngredient() : saveEdited()
  })

  $('#new').click((event) => { window.location.reload() })
}

$('#return').click((event) => { 
  getParams ? window.history.back() : window.location = '/src/views/Ingredients/index.html'
})

// Função responsavel pelo registro de um novo localidade no localStorage
newIngredient = () => {  
  function handleSubmit(event) {
    event.preventDefault()

    id = Math.random().toString().replace('0.', '')
    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    ingredients = JSON.parse(localStorage.getItem('ingredients'))

    if (ingredients == null) {
      ingredients = [{ id, data }]
      localStorage.setItem('ingredients', JSON.stringify(ingredients))
    } else {
      ingredients.push({ id, data })
      localStorage.setItem('ingredients', JSON.stringify(ingredients))
    }    
    $("#loadingModal").modal()
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Esta função identifica o localidade selecionado e antes de
// redirecionar para a tela de edição. Os parametros são encriptados
// para não ficarem totalmente explicitos na url
getIngredient = (id) => {
  ingredients = JSON.parse(localStorage.getItem('ingredients'))

  ingredientId = ingredients.findIndex((ingredient) => ingredient.id == id)
  ingredientId = ingredients[ingredientId]

  window.location = `/src/views/Ingredients/ingredientsForm.html?params=${ btoa( `${ JSON.stringify(ingredientId) }` ) }`
}

// Esta função recebe e descriptografa os dados do localidade com base 
// nos parametros passados na url e preenche o formulario
editIngredient = () => {
  document.getElementById('label').innerHTML= 'Editar localidade'
  params = JSON.parse(atob(getParams))

  document.getElementById('btnNewIngredient').setAttribute('onClick', 'saveEdited()')
  document.getElementById('btnNewIngredient').removeAttribute('id')

  document.getElementById('name').value = `${params.data.name}`
}

// Essa função recupera os dados do formulario após alteração
// e realiza o update no LocalStorage
saveEdited = () => {
  $("#loadingModal").modal()
  function handleSubmit(event) {
    event.preventDefault()

    params = JSON.parse(atob(getParams))
    ingredients = JSON.parse(localStorage.getItem('ingredients'))

    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    ingredientId = ingredients.findIndex((ingredient) => ingredient.id == params.id)
    ingredients[ingredientId].data = data
  
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Essa função identifica pelo id qual a posição do item no vetor
// remove o item e atualiza o vetor no LocalStorage
removeIngredient = (id) => {
  ingredients = JSON.parse(localStorage.getItem('ingredients'))

  ingredientId = ingredients.findIndex((ingredient) => ingredient.id == id)
  ingredients.splice(ingredientId, 1)

  localStorage.setItem('ingredients', JSON.stringify(ingredients))

  $("#modalSuccess").modal()
  $('#return').click((event) => { window.location.reload() })
}
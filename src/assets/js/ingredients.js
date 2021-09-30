const current = window.location.href
var ingredients = []

onload = () => {
  if (current.match('index')) {
    listIngredient()
  } else {
    onFormIngredients()
  }
}

listIngredient = () => {
  ingredients = JSON.parse(localStorage.getItem('ingredients'))

  if (ingredients != null) {
    writeCardsIngredient(ingredients)
  } else {
    document.getElementById('notIngredients').classList.remove('hidden')
  }
}

onFormIngredients = () => {
  $('#btnNewIngredient').click((event) => { newIngredient() })

  $('#return').click((event) => { window.history.back() })

  $('#new').click((event) => { window.location.reload() })
}

// Função responsavel pelo registro de um novo ingrediente no localStorage
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

editIngredient = () => {
  // TODO
}
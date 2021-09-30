const current = window.location.href
var requisitions = []

onload = () => {
  if (current.match('index')) {
    listRequisition()
  } else {
    onFormRequisitions()
  }
}

listRequisition = () => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  document.getElementById('clientList')

  if (requisitions != null) {
    writeCardsRequisition(requisitions)
  } else {
    document.getElementById('notRequisitions').classList.remove('hidden')
  }
}

onFormRequisitions = () => {
  $('#btnNewRequisition').click((event) => { newRequisition() })

  $('#return').click((event) => { window.history.back() })

  $('#new').click((event) => { window.location.reload() })

  fillSelect()
}

// Função responsavel pelo registro de um novo requisitione no localStorage
newRequisition = () => {  
  function handleSubmit(event) {
    event.preventDefault()

    id = Math.random().toString().replace('0.', '')
    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    requisitions = JSON.parse(localStorage.getItem('requisitions'))

    if (requisitions == null) {
      requisitions = [{ id, data }]
      localStorage.setItem('requisitions', JSON.stringify(requisitions))
    } else {
      requisitions.push({ id, data })
      localStorage.setItem('requisitions', JSON.stringify(requisitions))
    }    
    $("#loadingModal").modal()
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

editRequisition = () => {
  // TODO
}

fillSelect = () => {
  clients = JSON.parse(localStorage.getItem('clients'))

  if (clients != null) {
    clients.forEach(client => {
      option = `<option>${client.data.name}</option>`
      
      ele = document.createElement('option')
      ele.innerHTML = option
      document.getElementById("clientList").appendChild(ele.firstChild)
    })
  }

  products = JSON.parse(localStorage.getItem('products'))
  if (products != null) {
    products.forEach(product => {
      option = `<option>${product.data.name}</option>`
  
      ele = document.createElement('option')
      ele.innerHTML = option
      document.getElementById("productList").appendChild(ele.firstChild)
    })
  }
}
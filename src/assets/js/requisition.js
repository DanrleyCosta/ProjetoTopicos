const current = window.location.href
var requisitions = []

urlParams = new URLSearchParams(window.location.search)
getParams = urlParams.get('params')

onload = () => {
  if (current.match('index')) {
    listRequisitionOpen()
  } else if (current.match('Requisitions/requisitionCompleted.html')) {
    listRequisitionChecked()
  } else if (current.match('Requisitions/requisitionForm.html')) {
    !getParams ? onFormRequisitions() : editRequisition()

    $('#productList').selectpicker()
  
    // DateTimePicker
    flatpickr('.datetimepicker', {
      enableTime: true,
      minDate: "today",
      dateFormat: "d-m-Y H:i",
      language: 'pt-br',
    });
  } else {
    !getParams ? onFormRequisitions() : detailsRequisition()
  }
}

listRequisitionOpen = () => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  document.getElementById('clientList')

  if (requisitions != null) {
    writeCardsRequisitionOpen(requisitions)
  } else {
    document.getElementById('notRequisitions').classList.remove('hidden')
  }
}

listRequisitionChecked = () => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  document.getElementById('clientList')

  if (requisitions != null) {
    writeCardsRequisitionChecked(requisitions)
  } else {
    document.getElementById('notRequisitions').classList.remove('hidden')
  }
}

onFormRequisitions = () => {
  $('#btnNewRequisition').click((event) => {
    !getParams ? newRequisition() : saveEdited()
  })

  $('#new').click((event) => { window.location.reload() })

  fillSelect()

  document.getElementById('clientName').remove()
}

$('#return').click((event) => {
  !getParams ? window.history.back() : window.location = '/index.html'
})

// Função responsavel pelo registro de um novo requisitio no localStorage
newRequisition = () => {  
  products = document.getElementsByClassName("filter-option-inner-inner")[0]
  products = products.innerText
  document.getElementById('products').value = `${products}`

  select = document.getElementById('clientList');
  clientId = select.options[select.selectedIndex].getAttribute('id');
  document.getElementById('clientId').value = `${clientId}`

  function handleSubmit(event) {
    event.preventDefault()

    id = Math.random().toString().replace('0.', '')
    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    requisitions = JSON.parse(localStorage.getItem('requisitions'))

    if (requisitions == null) {
      requisitions = [{ id, data, status: 'open' }]
      localStorage.setItem('requisitions', JSON.stringify(requisitions))
    } else {
      requisitions.push({ id, data, status: 'open' })
      localStorage.setItem('requisitions', JSON.stringify(requisitions))
    }    
    $("#loadingModal").modal()
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Essa função tem como objetivo filtrar Clientes e Produtos
// e adicionar os itens ao select para criação de um Pedido
fillSelect = () => {
  clients = JSON.parse(localStorage.getItem('clients'))

  if (clients != null) {
    clients.forEach(client => {
      option = `<option id="${client.id}">${client.data.name}</option>`
      
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

// Esta função identifica o pedido selecionado e antes de
// redirecionar para a tela de edição. Os parametros são encriptados
// para não ficarem totalmente explicitos na url
getRequisition = (id) => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  requisitionId = requisitions.findIndex((requisition) => requisition.id == id)
  requisitionId = requisitions[requisitionId]

  window.location = `/src/views/Requisitions/requisitionDetails.html?params=${ btoa( `${ JSON.stringify(requisitionId) }` ) }`
}

// Esta função identifica o pedido com base nos parametros passados na url
// descriptografa os registros e cria na os elementos na view 
detailsRequisition = () => {
  params = JSON.parse(atob(getParams))
  clients = JSON.parse(localStorage.getItem('clients'))

  clientId = clients.findIndex((client) => client.id == params.data.clientId)
  clientId = clients[clientId]

  document.getElementById('clientName').innerHTML= `${params.data.client}`
  document.getElementById('clientPhone').innerHTML= `${clientId.data.phone}`
  document.getElementById('clientAddress').innerHTML=
    `${clientId.data.street}, ${clientId.data.number} - ${clientId.data.district}/${clientId.data.city}`

  document.getElementById('products').innerHTML= `${params.data.products}`
  document.getElementById('delivery').innerHTML= `${params.data.delivery}`

  url = `/src/views/Requisitions/requisitionForm.html?params=${ btoa( `${ JSON.stringify(params) }` ) }`

  $('#btnRemoveRequisition').click((event) => { removeRequisition(params) })
  $('#btnEditRequisition').click((event) => window.location = url )
  $('#btnChecked').click((event) => { setChecked(params) })
}

// Esta função recebe e descriptografa os dados do pedido com base 
// nos parametros passados na url e preenche o formulario
editRequisition = () => {
  document.getElementById('label').innerHTML= 'Editar Pedido'
  params = JSON.parse(atob(getParams))
  fillSelect()

  document.getElementById('btnNewRequisition').setAttribute('onClick', 'saveEdited()')
  document.getElementById('btnNewRequisition').removeAttribute('id')
  
  document.getElementById('clientList').remove()
  document.getElementById('clientId').value = `${params.data.clientId}`
  document.getElementById('clientName').value = `${params.data.client}`
  document.getElementById('client').innerHTML = `${params.data.client}`

  document.getElementById('productList').value = `${params.data.products}`
  document.getElementById('delivery').value = `${params.data.delivery}`
}

saveEdited = () => {
  $("#loadingModal").modal()

  products = document.getElementsByClassName("filter-option-inner-inner")[0]
  products = products.innerText
  document.getElementById('products').value = `${products}`

  function handleSubmit(event) {
    event.preventDefault()

    params = JSON.parse(atob(getParams))
    requisitions = JSON.parse(localStorage.getItem('requisitions'))

    forms = new FormData(event.target)
    data = Object.fromEntries(forms.entries())

    requisitionId = requisitions.findIndex((requisition) => requisition.id == params.id)
    
    id = data.id
    data = {
      client: data.client,
      clientId: data.clientId,
      delivery: data.delivery,
      products: data.products
    }
  
    requisitions[requisitionId] = {id, data, status: 'open'}

    localStorage.setItem('requisitions', JSON.stringify(requisitions))
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Essa função identifica pelo id qual a posição do item no vetor
// remove o item e atualiza o vetor no LocalStorage
removeRequisition = (id) => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  requisitionId = requisitions.findIndex((requisition) => requisition.id == id)
  requisitions.splice(requisitionId, 1)

  localStorage.setItem('requisitions', JSON.stringify(requisitions))

  $("#modalSuccess").modal()
  $('#return').click((event) => { window.location = '/index.html' })
}

// Essa função seta o status do pedido para concluido
setChecked = (params) => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))
  requisitionId = requisitions.findIndex((requisition) => requisition.id == params.id)

  id = params.id

  data = {
    client: params.data.client,
    clientId: params.data.clientId,
    delivery: params.data.delivery,
    products: params.data.products
  }

  requisitions[requisitionId] = {id, data, status: 'checked'}
  localStorage.setItem('requisitions', JSON.stringify(requisitions))
}
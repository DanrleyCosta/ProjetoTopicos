const current = window.location.href
var clients = []

urlParams = new URLSearchParams(window.location.search)
getParams = urlParams.get('params')

onload = () => {
  if (current.match('index')){
    listClient()
  } else if (current.match('Clients/detailsClients')) {
    datailsClient()
  }else {
    !getParams ? onFormClients() : editClient()
  }
}

listClient = () => {
  clients = JSON.parse(localStorage.getItem('clients'))

  if (clients != null && clients.length != 0) {
    writeCardsClient(clients)
  } else {
    document.getElementById('notClients').classList.remove('hidden')
  }
}

// Função responsavel por adicionar mascaras nos inputs
onFormClients = () => {
  $('#phone').mask('(99) 9 9999-9999', {placeholder: '(99) 9 9999-9999'})
  $('#cep').mask('00000-000', {placeholder: '00000-000'})

  $('#btnNewClient').click((event) => { clientVerify() })

  $('#return').click((event) => {
    !getParams ? window.history.back() : window.location = '/src/views/Clients/index.html'
  })

  $('#home').click((event) => { window.history.back() })

  $('#new').click((event) => { window.location.reload() })
}

// Função responsavel por validar se os registros de um novo cliente
clientVerify = () => {
  function handleSubmit(event) {
    event.preventDefault()
    data = new FormData(event.target)
    values = Object.fromEntries(data.entries())

    if (values.phone.length < 8) {
      document.getElementById('phone').classList.remove('mb-4')

      create_error = document.getElementById('errors_phone')
      create_error.innerHTML= '<small class="text-danger font-weight-bold">O telefone deve possuir no min. 8 caracteres</small>'
    } else if (values.cep.split('-').join('').length < 8) {
      document.getElementById('cep').classList.remove('mb-4')

      create_error = document.getElementById('errors_cep')
      create_error.innerHTML= '<small class="text-danger font-weight-bold">O CEP deve possuir 8 caracteres numéricos</small>'
    } else {
      $('#loadingModal').modal()
      !getParams ? newClient(values) : saveEdited(values)
    }
  }
  const form = document.querySelector('form')
  form.addEventListener('submit', handleSubmit)
}

// Função responsavel pelo registro de um novo cliente no localStorage
newClient = (data) => {
  clients = JSON.parse(localStorage.getItem('clients'))
  id = Math.random().toString().replace('0.', '')

  if (clients == null) {
    clients = [{ id, data }]
    localStorage.setItem('clients', JSON.stringify(clients))
  } else {
    clients.push({ id, data })
    localStorage.setItem('clients', JSON.stringify(clients))
  }
}

// Esta função identifica o cliente selecionado e antes de
// redirecionar para a tela de detalhes os parametros são codificados
// para não ficarem totalmente explicitos na url
getClient = (id) => {
  clients = JSON.parse(localStorage.getItem('clients'))

  clientId = clients.findIndex((client) => client.id == id)
  clientId = clients[clientId]

  window.location = `/src/views/Clients/detailsClients.html?params=${ btoa( `${ JSON.stringify(clientId) }` ) }`
}

// Esta função identifica o cliente com base nos parametros passados na url
// descriptografa os registros e cria na os elementos na view 
datailsClient = () => {
  params = JSON.parse(atob(getParams))

  document.getElementById('clientName').innerHTML= `${params.data.name}`
  document.getElementById('clientPhone').innerHTML= `${params.data.phone}`
  document.getElementById('clientAddress').innerHTML=
    `${params.data.street}, ${params.data.number} - ${params.data.district}/${params.data.city}`

  url = `/src/views/Clients/formClients.html?params=${ btoa( `${ JSON.stringify(params) }` ) }`

  $('#btnRemoveClient').click((event) => { removeClient(params) })
  $('#btnEditClient').click((event) => window.location = url )
}

// Esta função recebe os dados do cliente com base 
// nos parametros passados na url e preenche o formulario
editClient = () => {
  onFormClients()
  document.getElementById('label').innerHTML= 'Editar Cliente'
  params = JSON.parse(atob(getParams))

  document.getElementById('name').value = `${params.data.name}`
  document.getElementById('phone').value = `${params.data.phone}`
  document.getElementById('cep').value = `${params.data.cep}`
  document.getElementById('street').value = `${params.data.street}`
  document.getElementById('number').value = `${params.data.number}`
  document.getElementById('district').value = `${params.data.district}`
  document.getElementById('city').value = `${params.data.city}`
}

// Esta função recebe os dados atualizados e realiza o update no storage 
saveEdited = (data) => {
  params = JSON.parse(atob(getParams))
  clients = JSON.parse(localStorage.getItem('clients'))

  clientId = clients.findIndex((client) => client.id == params.id)
  clients[clientId].data = data

  localStorage.setItem('clients', JSON.stringify(clients))
}

removeClient = (id) => {
  clients = JSON.parse(localStorage.getItem('clients'))

  clientId = clients.findIndex((client) => client.id == id)
  clients.splice(clientId, 1)

  localStorage.setItem('clients', JSON.stringify(clients))

  $("#modalSuccess").modal()
  $('#return').click((event) => { window.history.back() })
}

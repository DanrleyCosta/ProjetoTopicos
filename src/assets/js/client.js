const current = window.location.href
var clients = []

onload = () => {
  if (current.match('index')){
    listClient()
  } else if (current.match('Clients/detailsClients')) {
    editClient()
  }else {
    onFormClients()
  }
}

listClient = () => {
  clients = JSON.parse(localStorage.getItem('clients'))

  if (clients != null) {
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

  $('#return').click((event) => { window.history.back() })

  $('#new').click((event) => { window.location.reload() })
}

// Função responsavel por validar se os registros de um novo cliente
clientVerify = () => {
  function handleSubmit(event) {
    event.preventDefault()
    data = new FormData(event.target)
    values = Object.fromEntries(data.entries())
    console.log(values)

    if (values.phone.length < 8) {
      document.getElementById('phone').classList.remove('mb-4')

      create_error = document.getElementById('errors_phone')
      create_error.innerHTML= '<small class="text-danger font-weight-bold">O telefone deve possuir no min. 8 caracteres</small>'
    } else if (values.cep.split('-').join('').length < 8) {
      document.getElementById('cep').classList.remove('mb-4')

      create_error = document.getElementById('errors_cep')
      create_error.innerHTML= '<small class="text-danger font-weight-bold">O CEP deve possuir 8 caracteres numéricos</small>'
    } else {
      $("#loadingModal").modal()
      newClient(values)
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

editClient = () => {
  // TODO
  // let campo = document.querySelector('#inputAlteraTarefa');
  // let idTarefa = campo.getAttribute('data-id');
  // let i = tarefas.findIndex((t) => t.id == idTarefa);
  // tarefas[i].descricao = campo.value;
  // campo.value = '';
  // campo.removeAttribute('data-id');
  // ativa('tela1');
  // salvaTarefas();
  // mostraTarefas();
}

// const apagaTarefa = () => {
//   let campo = document.querySelector('#inputAlteraTarefa');
//   let idTarefa = campo.getAttribute('data-id');
//   tarefas = tarefas.filter((t) => t.id != idTarefa);
//   campo.value = '';
//   campo.removeAttribute('data-id');
//   ativa('tela1');
//   salvaTarefas();
//   mostraTarefas();
// };
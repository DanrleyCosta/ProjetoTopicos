const current = window.location.href
var requisitions = []

urlParams = new URLSearchParams(window.location.search)
getParams = urlParams.get('params')

onload = () => {
  if (current.match('index')) {
    listRequisition()
  } else if (current.match('Requisitions/requisitionCompleted.html')) {

  }else {
    !getParams ? onFormRequisitions() : editRequisition()
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
  $('#btnNewRequisition').click((event) => {
    !getParams ? newRequisition() : saveEdited()
  })

  $('#new').click((event) => { window.location.reload() })

  fillSelect()
}

$('#return').click((event) => {
  getParams ? window.history.back() : window.location = '/index.html'
})

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

// Essa função tem como objetivo filtrar Clientes e Produtos
// e adicionar os itens ao select para criação de um Pedido
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

// Esta função identifica o pedido selecionado e antes de
// redirecionar para a tela de edição. Os parametros são encriptados
// para não ficarem totalmente explicitos na url
getRequisiton = (id) => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  requisitionId = requisitions.findIndex((requisition) => requisition.id == id)
  requisitionId = requisitions[requisitionId]

  window.location = `/src/views/requisitions/requisitionsForm.html?params=${ btoa( `${ JSON.stringify(requisitionId) }` ) }`
}

// Esta função recebe e descriptografa os dados do pedido com base 
// nos parametros passados na url e preenche o formulario
editRequisition = () => {
  document.getElementById('label').innerHTML= 'Editar Pedido'
  params = JSON.parse(atob(getParams))

  document.getElementById('btnNewRequisition').setAttribute('onClick', 'saveEdited()')
  document.getElementById('btnNewRequisition').removeAttribute('id')

  document.getElementById('client').value = `${params.data.client}`
  document.getElementById('product').value = `${params.data.product}`
  document.getElementById('delivery').value = `${params.data.delivery}`
}

// Essa função identifica pelo id qual a posição do item no vetor
// remove o item e atualiza o vetor no LocalStorage
removeRequisition = (id) => {
  requisitions = JSON.parse(localStorage.getItem('requisitions'))

  requisitionId = requisitions.findIndex((requisition) => requisition.id == id)
  requisitions.splice(requisitionId, 1)

  localStorage.setItem('requisitions', JSON.stringify(requisitions))

  $("#modalSuccess").modal()
  $('#return').click((event) => { window.location.reload() })
}
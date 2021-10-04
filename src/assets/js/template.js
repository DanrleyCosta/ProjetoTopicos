// Este arquivo armazena os modelos de cards e escreve os dados
// nas telas que possuam dados registrados no LocalStorge

// Função responsavel por escrever os cards de Clientes existentes
// Referenciada no arquivo src/assets/js/client.js:18
writeCardsClient = (clients) => {
  clients.forEach(client => {
    const card = 
    `<div class="card card-radius ml-3 mr-3 mt-3">
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <img src="/src/assets/image/user.svg" alt="">
          </div>
          <div class="col-9">
            <blockquote class="blockquote mb-0">
              <h5 class="font-weight-bold">${client.data.name}</h5>
              <p class="font-weight-bold ">${client.data.phone}</p>
              <footer class="text-secondary d-flex justify-content-end">
                <button
                  data-id="${client.id}"
                  onClick="getClient(${client.id})"
                  class="btn btn-icon-only rounded-circle text-secondary">
                  <i class="material-icons nav__icon mt-1">help_outline</i>
                </button>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>`

    const ele = document.createElement('div')
    ele.innerHTML = card
    document.body.appendChild(ele.firstChild)
  })

  const ele = document.createElement('div')
  ele.innerHTML = `<div class="p-5"></div>`
  document.body.appendChild(ele.firstChild)
}

// Função responsavel por escrever os cards de Ingredientes existentes
// Referenciada no arquivo src/assets/js/ingredients.js:16
writeCardsIngredient = (ingredients) => {
  ingredients.forEach(ingredient => {
    const card = 
    `<div class="card card-radius ml-3 mr-3 mt-3">
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <img src="/src/assets/image/food-salad.svg" alt="">
          </div>
          <div class="col-9">
            <blockquote class="blockquote mb-0">
              <h5 class="font-weight-bold text-justify">${ingredient.data.name}</h5>
              <footer class="text-secondary d-flex justify-content-end">
                <button
                  data-id="${ingredient.id}"
                  onClick="removeIngredient(${ingredient.id})"
                  class="btn btn-icon-only rounded-circle text-danger">
                  <i class="material-icons nav__icon mt-1">delete</i>
                </button>
                <button
                  data-id="${ingredient.id}"
                  onClick="getIngredient(${ingredient.id})"
                  class="btn btn-icon-only rounded-circle text-secondary">
                  <i class="material-icons nav__icon mt-1">edit</i>
                </button>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>`

    const ele = document.createElement('div')
    ele.innerHTML = card
    document.body.appendChild(ele.firstChild)
  })

  const ele = document.createElement('div')
  ele.innerHTML = `<div class="p-5"></div>`
  document.body.appendChild(ele.firstChild)
}

// Função responsavel por escrever os cards de Produtos existentes
// Referenciada no arquivo src/assets/js/products.js:
writeCardsProduct = (products) => {
  products.forEach(product => {
    const card = 
    `<div class="card card-radius m-3">
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <img src="/src/assets/image/breakfast.svg" alt="">
          </div>
          <div class="col-9">
            <blockquote class="blockquote mb-0">
              <h5 class="font-weight-bold text-justify">${product.data.name}</h5>
              <footer class="text-secondary d-flex justify-content-end">
                <button
                  data-id="${product.id}"
                  onClick="removeProduct(${product.id})"
                  class="btn btn-icon-only rounded-circle text-danger">
                  <i class="material-icons nav__icon mt-1">delete</i>
                </button>
                <button
                  data-id="${product.id}"
                  onClick="getProduct(${product.id})"
                  class="btn btn-icon-only rounded-circle text-secondary">
                  <i class="material-icons nav__icon mt-1">edit</i>
                </button>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>`

    const ele = document.createElement('div')
    ele.innerHTML = card
    document.body.appendChild(ele.firstChild)
  })

  const ele = document.createElement('div')
  ele.innerHTML = `<div class="p-5"></div>`
  document.body.appendChild(ele.firstChild)
}

// Função responsavel por escrever os cards de Produtos existentes
// Referenciada no arquivo src/assets/js/requisition.js:
writeCardsRequisitionOpen = (requisitions) => {
  requisitions.forEach(requisition => {
    if (requisition.status == 'open') {
      const card = 
      `<div class="card card-radius m-3">
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <img src="/src/assets/image/receipt_long.svg" alt="">
            </div>
            <div class="col-9">
              <blockquote class="blockquote mb-0">
                <h5 class="font-weight-bold text-justify">${requisition.data.client}</h5>
                <p class="font-weight-bold text-justify text-muted">${requisition.data.delivery} horas</p>
                <footer class="text-secondary d-flex justify-content-end">
                  <button
                    data-id="${requisition.id}"
                    onClick="getRequisition(${requisition.id})"
                    class="btn btn-icon-only rounded-circle text-secondary">
                    <i class="material-icons nav__icon mt-1">help_outline</i>
                  </button>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>`
  
      const ele = document.createElement('div')
      ele.innerHTML = card
      document.body.appendChild(ele.firstChild)
    }
  })

  const ele = document.createElement('div')
  ele.innerHTML = `<div class="p-5"></div>`
  document.body.appendChild(ele.firstChild)
}

// Função responsavel por escrever os cards de Produtos existentes
// Referenciada no arquivo src/assets/js/requisition.js:
writeCardsRequisitionChecked = (requisitions) => {
  requisitions.forEach(requisition => {
    if (requisition.status == 'checked') {
      const card = 
      `<div class="card card-radius m-3">
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <img src="/src/assets/image/event_checked.svg" alt="">
            </div>
            <div class="col-9">
              <blockquote class="blockquote mb-0">
                <h5 class="font-weight-bold text-justify">${requisition.data.client}</h5>
                <p class="font-weight-bold text-justify text-muted">${requisition.data.delivery} horas</p>
                <footer class="text-secondary d-flex justify-content-end">
                  <button
                    data-id="${requisition.id}"
                    onClick="getRequisition(${requisition.id})"
                    class="btn btn-icon-only rounded-circle text-secondary">
                    <i class="material-icons nav__icon mt-1">help_outline</i>
                  </button>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>`

      const ele = document.createElement('div')
      ele.innerHTML = card
      document.body.appendChild(ele.firstChild)
    }
  })

  const ele = document.createElement('div')
  ele.innerHTML = `<div class="p-5"></div>`
  document.body.appendChild(ele.firstChild)
}

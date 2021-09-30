// Este arquivo armazena os modelos de cards e escreve os dados
// nas telas que possuam dados registrados no LocalStorge

// Função responsavel por escrever os cards de Clientes existentes
// Referenciada no arquivo src/assets/js/client.js:18
writeCardsClient = (clients) => {
  console.log(clients)

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
              <h5 class="font-weight-bold">${client.data.client_name}</h5>
              <p class="font-weight-bold ">${client.data.client_phone}</p>
              <footer class="text-secondary d-flex justify-content-end">
                <a href="./detailsClients.html"
                  data-id=${client.data.id}
                  class="btn btn-icon-only rounded-circle text-secondary">
                  <i class="material-icons nav__icon mt-1">help_outline</i>
                </a>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>`
    const ele = document.createElement('div');
    ele.innerHTML = card;
    document.body.appendChild(ele.firstChild);
  })
}

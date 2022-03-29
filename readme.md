<h1 align="center">
 <img alt="GG" height="80" title="Plant Manager" src=".github/logo4848.png" style="border-radius: 20px" />
</h1>
 
<p align="center">
 <img alt="License" src="https://img.shields.io/static/v1?label=License&message=MIT&color=E51C44&labelColor=0A1033">
 <img src="https://img.shields.io/static/v1?label=&message=HTML 5&color=E51C44&labelColor=fff&logo=html5"/>
 <img src="https://img.shields.io/static/v1?label=&message=CSS 3&color=E51C44&labelColor=1572B6&logo=css3"/>
 <img src="https://img.shields.io/static/v1?label=&message=Bootstrap 5&color=E51C44&labelColor=fff&logo=bootstrap"/>
 <img src="https://img.shields.io/static/v1?label=&message=ES6&color=E51C44&labelColor=0A1033&logo=javascript"/>
</p>
&nbsp;
 
## 💻 Cê Aceita
&nbsp;
 
**Danrley Costa De Souza**
 
O aplicativo CêAceita é um projeto que tem como objetivo informar ao usuário se os
comércios de determinada região aceitam determinadas formas de pagamento para
que o usuário consiga se planejar antes de ir para o local.
 
## 1. Interfaces
 
### Tela principal - Estabelecimentos
 
Nesta tela, por padrão o usuário poderá visualizar seus Estabelecimentos ***"Em Andamento"***. Se não existirem registros será apresentado um gif e um texto identificando que não existem registros.
Como apresentado abaixo:
 
 
Clicando no botão com o símbolo '+' é possível realizar a inserção de um novo bandeiras que será mostrado mais adiante.
 
Caso o usuário clique em ***"Fechados"*** Irá visualizar seus Estabelecimentos concluídos se existirem. Conforme apresentado abaixo:
 
 
### Cadastro das bandeiras
 
Nesta tela o usuário poderá selecionar um Loja, quantos Aceitos estiverem disponíveis e a Data/Hora de entrega para o bandeiras.
 
 
### Detalhes das bandeiras
 
Ao clicar no ícone de interrogação na tela de Estabelecimentos *"Em Aberto"* ou *"Concluídos"* o usuário será levado a tela onde serão apresentados os detalhes das bandeiras.
Informações sobre o Loja, Aceitos relacionados e a data de entrega.
 
Essa tela também apresenta ao usuário as opções de:
 
- Finalizar o bandeiras;
- Editar o bandeiras;
- Excluir o bandeiras.
 
 
 
Com a opção de edição o usuário será enviado para o formulário podendo atualizar os Aceitos selecionados e a data de entrega.
 
### Tela de Aceitos
 
Como nas outras telas de listagem, caso não existam registros será apresentado um gif e texto explicativo.
 

 
 
Nessa tela será possível ***adicionar***, ***remover*** e ***editar*** os registros.
 
Clicando no botão de ***adição*** o usuário irá preencher o nome do local 

Clicando no ***lapis*** O usuário será levado para a tela de edição, onde poderá alterar o nome, adicionar ou remover Locais.
 
Clicando na ***lixeira*** o usuário removerá o registro.
 
### Tela de Locais
 
Como nas outras telas de listagem, caso não existam registros será apresentado um gif e texto explicativo.
 

 
Nessa tela será possível ***adicionar***, ***remover*** e ***editar*** os registros.
 
Clicando no botão de ***adição*** o usuário irá preencher o nome do ingrediente.
 
Clicando no ***lapis*** O usuário será levado para a tela de edição, onde poderá alterar o nome do ingrediente.
 
Clicando na ***lixeira*** o usuário removerá o registro.
 
### Tela de Lojas
 
Como nas outras telas de listagem, caso não existam registros será apresentado um gif e texto explicativo.

 
Nessa tela ao clicar no botão de adição o usuário será levado ao formulário de cadastro.
 
Ao clicar na interrogação(?) o usuário será levado a tela de detalhes.
 
### Cadastro de Loja
 
O usuário poderá cadastrar seus Lojas com as seguinte informações:
 
- Nome;
- Telefone;
- Endereço.
 
### Detalhes do Loja
 
 
Nesta tela serão apresentados os dados do Loja e será possível remover ou editar os registros.
 
No momento da edição todos os dados estão disponíveis para alteração.
 
### Descrição
 
Nesta tela apenas é apresentada uma mini descrição sobre a aplicação e a referência do repositório no GitHub.
 
 
## 2. Dados do usuário
 
Nesta aplicação, os dados do usuário são armazenados por meio do LocalStorage e vinculados em outras telas, mantendo o seguinte fluxo.
 
- Cadastro e Edição de Locais;
- Cadastro de Aceitos que utilizam as informações do Locais;
- Cadastro, Visualização e Edição de Lojas;
 
Com todos estes passos concluídos é possível gerar um bandeiras vinculando o Loja e os Aceitos criados.
 
Durante a navegação das páginas os dados do usuário são passados como parâmetro através da url. Como uma forma de segurança os dados estão sendo encriptados para que não fiquem totalmente explícitos na url.
 
## 3. Checklist de implementação
 
- A aplicação é original? **Sim**
- A aplicação tem pelo menos duas interfaces? **Sim**
- A aplicação armazena e usa de forma relevante dados complexos do usuário? **Sim**
- A aplicação possui um manifesto para instalação no dispositivo do usuário? **Sim**
- A aplicação possui um _service worker_ que permite o funcionamento off-line? **Sim**
- O código da minha aplicação possui comentários explicando cada operação? **Sim**
- A aplicação está funcionando corretamente? **Não**. 

Esta com problemas na adição de **Aceitos** e **Estabelecimentos**, pois os dados não estão sendo retornados da forma que deveriam no componente de seleção. Impossibilitando o usuário de alterar os itens de produto e bandeiras.
 
- A aplicação está completa?
 **Sim**


let tableBody = document.querySelector('.table-body')
let tdId = document.querySelector('.td-id')
let tdModelo = document.querySelector('.td-modelo')
let tdValor = document.querySelector('.td-valor')
let tdDescricao = document.querySelector('.td-descricao')
let addCarBtn = document.querySelector('.add-car-btn-img')



fetch('https://imdev.azurewebsites.net/vendarro/get-carros.php')
    .then(response => response.json())
    .then(json => {
        objects = json
        listCars(objects)
    })

function listCars(cars) {

    tableBody.innerHTML = ``

    for (let i in cars) {

        let id = cars[i].id
        let modelo = cars[i].modelo
        let valor = cars[i].valor
        let descricao = cars[i].descricao


        tableBody.innerHTML += `
    <tr class="table-row">
        <td  class="td-id">${id}</td>
        <td  class="td-modelo">${modelo}</td>
        <td  class="td-valor">${valor}</td>
        <td  class="td-descricao">${descricao}</td>
        <td>
            <div class="td-action">
                <img class="td-edit" src="images/edit.png">
                <img class="td-delete" src="images/delete.png">
            </div>
        </td>
    </tr>`
    }
}

function closeModal() {
    let background = document.querySelector('.background')
    let formDiv = document.querySelector('.form-div')
    let xBtn = document.querySelector('.x')

    addCarBtn.addEventListener('click', function () {
        background.style.display = 'flex'
        formDiv.style.display = 'flex'
    })

    background.addEventListener('click', function () {
        background.style.display = 'none'
        formDiv.style.display = 'none'
    })

    xBtn.addEventListener('click', function () {
        background.style.display = 'none'
        formDiv.style.display = 'none'
    })

}
closeModal()

let form = document.getElementById('form')

form.addEventListener('submit', function (event){
    event.preventDefault()

    const formData = new FormData(form)

    fetch('https://imdev.azurewebsites.net/vendarro/create-carro.php', {
        method: 'post',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

})

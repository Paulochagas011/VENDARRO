
// getin elements with querySelector
let body = document.querySelector('body')
let tableBody = document.querySelector('.table-body')
let tdId = document.querySelector('.td-id')
let tdModelo = document.querySelector('.td-modelo')
let tdValor = document.querySelector('.td-valor')
let tdDescricao = document.querySelector('.td-descricao')
let addCarBtn = document.querySelector('.add-car-btn-img')

// geting cars from api
function getCars() {
    fetch('https://imdev.azurewebsites.net/vendarro/get-carros.php')
        .then(response => response.json())
        .then(json => {
            objects = json
            listCars(objects)
        })
}

getCars()

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
                <img class="td-edit" data-edit=${id} src="images/edit.png">
                <img class="td-delete" data-delete=${id} src="images/delete.png">
            </div>
        </td>
    </tr>`
    }

    let buttonEdit = document.querySelectorAll('.td-edit')
    buttonEdit.forEach(button => {

        button.onclick = function () {
            let carId = this.getAttribute('data-edit')
            editModal(carId)
        }

    })

    let buttonDelete = document.querySelectorAll('.td-delete')
    buttonDelete.forEach(button => {

        button.onclick = function () {
            carId = this.getAttribute('data-delete')
            deleteItem(carId)
            OpenDeleteModal()
        }
    })
}

function editModal(id) {
    secondModal()

    let carInfo = objects.find(car => car.id == id)

    let carId = carInfo.id
    let carModel = carInfo.modelo
    let carValue = carInfo.valor
    let carDescription = carInfo.descricao
    let carFoto = carInfo.foto
    
    let inputModelo = document.querySelector('#modelo-carro-edit').value = carModel
    let inputValue = document.querySelector('#valor-carro-edit').value = carValue
    let inputDescription = document.querySelector('#description-carro-edit').value = carDescription
    
    document.querySelector('#hidden-id').value = id
}

let formEdit = document.getElementById('form-edit')

formEdit.addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(formEdit)

    fetch('https://imdev.azurewebsites.net/vendarro/update-carro.php', {
        method: 'post',
        body: formData,
        strictErrors: true
    })
        .then(response => {
            if (!response.ok) {
                alert('Erro ao Atualizar: status ' + response.status)
            } else {
                return response
            }
        })
        .then(data => {
            getCars()
            if (data.length != data) {
                alert('Carro Atualizado')
            }
        })
        .catch(error => error)
    closeModal()
})

function deleteItem(id){
    let carToBeDeleted = objects.find(car => car.id == id)
    
    const formData = new FormData()
    formData.append('id', id)

    fetch('https://imdev.azurewebsites.net/vendarro/delete-carro.php', {
        method: 'post',
        body: formData,
        strictErrors: true
    })
        .then(response => {
            if (!response.ok) {
                alert('Erro ao Deletar: status ' + response.status)
            } else {
                return response
            }
        })
        .then(data => {
            getCars()
            if(response.ok){
                alert('Carro deletado')
            } 
        })
}

//OPEN MODAL
let formDiv = document.querySelector('.form-div')

function openModal() {

    background.style.display = 'flex'
    formDiv.style.display = 'flex'
    body.style.overflow = 'hidden'
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

addCarBtn.addEventListener('click', function () {
    openModal()
})

//OPEN EDIT MODAL
let formDivEdit = document.querySelector('.form-div-edit')


function secondModal (){
    background.style.display = 'flex'
    formDivEdit.style.display = 'flex'
    body.style.overflow = 'hidden'
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

//OPEN DELETE MODAL
let deleteModal = document.querySelector('.delete-modal')

function OpenDeleteModal(){
    background.style.display = 'flex'
    deleteModal.style.display = 'flex'
    body.style.overflow = 'hidden'
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}
//CLOSE MODAL
let background = document.querySelector('.background')
let xBtn = document.querySelectorAll('.x')

function closeModal() {
    background.style.display = 'none'
    formDiv.style.display = 'none'
    formDivEdit.style.display = 'none'
    body.style.overflow = 'auto'
}
closeModal()
//CLOSE MODAL WHEN CLICK ON BACKGROUND
background.addEventListener('click', function () {
    closeModal()
})
//CLOSE MODAL WHEN CLICK ON X BUTTON
xBtn.forEach(button => {

    button.onclick = function () {
        closeModal()
    }

})
//CLOSE WHEN PRESS ESC
document.body.addEventListener('keydown', function (event) {
    let keyCode = event.keyCode
    if (keyCode == 27) {
        closeModal()
    }
});

let form = document.getElementById('form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

    const formData = new FormData(form)

    fetch('https://imdev.azurewebsites.net/vendarro/create-carro.php', {
        method: 'post',
        body: formData,
        strictErrors: true
    })
        .then(response => {
            if (!response.ok) {
                alert('Erro ao cadastrar: status ' + response.status)
            } else {
                return response
            }
        })
        .then(data => {
            getCars()
            if (data.length != data) {
                alert('Carro cadastrado')
            }
        })
        .catch(error => error)
    closeModal()
})

//DELETE CARS




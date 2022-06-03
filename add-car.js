// GETING ELEMENTS GLOBAL ELEMENTS
let body = document.querySelector('body')

let tableBody = document.querySelector('.table-body')
let tdId = document.querySelector('.td-id')
let tdModelo = document.querySelector('.td-modelo')
let tdValor = document.querySelector('.td-valor')
let tdDescricao = document.querySelector('.td-descricao')

let addCarBtn = document.querySelector('.add-car-btn-img')

// GETING CARS FROM API
function getCars() {
    fetch('https://imdev.azurewebsites.net/vendarro/get-carros.php')
        .then(response => response.json())
        .then(json => {
            objects = json
            listCars(objects)
        })
}
getCars()

// LISTING CARS ON SCREEN
function listCars(cars) {

    //SHOWING CARS FROM API
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

    // EDIT BUTTON ON TABLE
    let buttonEdit = document.querySelectorAll('.td-edit')
    buttonEdit.forEach(button => {

        button.onclick = function () {
            let carId = this.getAttribute('data-edit')
            editModal(carId)
        }

    })

    // DELETE BUTTON ON TABLE
    let buttonDelete = document.querySelectorAll('.td-delete')
    buttonDelete.forEach(button => {

        button.onclick = function () {
            carId = this.getAttribute('data-delete')
            OpenDeleteModal()
        }
    })
}

// MAIN FORM, THE ADD CAR FORM
let form = document.getElementById('form')

form.addEventListener('submit', function (event) {
    
    event.preventDefault()

    checkInputs()
})

function createCar(){
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
                alert('Carro cadrastado')
            }
        })
        .catch(error => error)
    closeModal()
}

//FUNCTION TO OPEN ADD CAR MODAL
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

//OPEN ADD CAR MODAL
let formDiv = document.querySelector('.form-div')

addCarBtn.addEventListener('click', function () {
    openModal()
})

// THE EDIT FORM
let formEdit = document.getElementById('form-edit')

formEdit.addEventListener('submit', function (event) {

    event.preventDefault()
    checkInputsOnEditModal()
})

function editCar() {
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
}

//OPEN EDIT MODAL
let formDivEdit = document.querySelector('.form-div-edit')

function openEditModal (){
    background.style.display = 'flex'
    formDivEdit.style.display = 'flex'
    body.style.overflow = 'hidden'
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

// EDIT MODAL
function editModal(id) {
    
    openEditModal()

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

// FUNCTION TO CALL ON DELETE BUTTON FROM TABLE
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
            alert('Carro deletado')
        })
}

//  BUTTON "SIM" FROM DELETE MODAL
let deleteSimbtn = document.querySelector('.delete-sim-btn')
deleteSimbtn.onclick = function(){
    deleteItem(carId)
    closeModal()
}

//BUTTON "NÃO" FROM DELETE MODAL
let deleteNaoBtn = document.querySelector('.delete-nao-btn')
deleteNaoBtn.addEventListener('click', function () {
    closeModal()
})

//CHECK IF ALL INPUTS ARE WITH SOME VALUE
function checkInputs(){

    let inputModelo = document.querySelector('#modelo-carro').value
    let inputValue = document.querySelector('#valor-carro').value
    let inputDescription = document.querySelector('#description-carro').value

    if(inputModelo == '' || inputValue == '' || inputDescription == ''){
        alert('Por favor preencha todos os campos')
    } else{
        createCar()
    }

}

function checkInputsOnEditModal(){
    
    let inputModeloEdit = document.querySelector('#modelo-carro-edit').value
    let inputValueEdit = document.querySelector('#valor-carro-edit').value
    let inputDescriptionEdit = document.querySelector('#description-carro-edit').value

    if(inputModeloEdit == '' || inputValueEdit == '' || inputDescriptionEdit == ''){
        alert('Por favor preencha todos os campos')
    } else {
        editCar()
    }
}

//CLOSE MODALS
let background = document.querySelector('.background')
let xBtn = document.querySelectorAll('.x')

function closeModal() {
    background.style.display = 'none'
    formDiv.style.display = 'none'
    formDivEdit.style.display = 'none'
    deleteModal.style.display = 'none'
    body.style.overflow = 'auto'
}
closeModal()

//CLOSE MODALS WHEN CLICK ON BACKGROUND
background.addEventListener('click', function () {
    closeModal()
})

//CLOSE MODALS WHEN CLICK ON X BUTTON
xBtn.forEach(button => {

    button.onclick = function () {
        closeModal()
    }

})

//CLOSE MODALS WHEN PRESS ESC
document.body.addEventListener('keydown', function (event) {
    let keyCode = event.keyCode
    if (keyCode == 27) {
        closeModal()
    }
});
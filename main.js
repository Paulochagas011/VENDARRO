// CAPTURING ELEMENTS AND DEFINING GLOBAL VARIABLES


let body = document.querySelector('body')
let modal = document.querySelector('.modal')
let search = document.querySelector('.search')
let carsContainer = document.querySelector('.cars-container')
let hide = document.querySelector('.hide')
let background = document.querySelector('#background')

//GETING CARS FROM API

fetch('https://imdev.azurewebsites.net/vendarro/get-carros.php')
    .then(response => response.json())
    .then(json => {
        objects = json
        listCars(objects)
    })

    //FILTERING CARS
    search.onkeyup = function carsFilter() {
        let searchValue = search.value.toLowerCase()
        
        let objectsFiltered = []
        
        objectsFiltered = objects.filter(obj => {
            return obj.modelo.toLowerCase().includes(searchValue)
        })
        
        listCars(objectsFiltered)
        
    }
    
    carsContainer.innerHTML = 'Buscando carros...'
    
    //LISTING CARS
    function listCars(cars) {
    
        let foundCars = document.querySelector('.found-cars p')
        foundCars.textContent = `Carros encontrados: ${cars.length}`
    
        if (cars.length === 0) {
            carsContainer.innerHTML = '<h1>nenhum carro foi encontrado</h1>'
            return
        }
    
        //CREATING CARDS
        carsContainer.innerHTML = ``
    
        for (let i in cars) {
    
            let id = cars[i].id
            let modelo = cars[i].modelo
            let valor = cars[i].valor
            let foto = cars[i].foto
            let filePatch = cars[i].filePatch
    
            carsContainer.innerHTML += `
            <div class="card-container" data-car=${id}>
            <img src="https://imdev.azurewebsites.net/vendarro/img//${foto}" alt="${modelo}">
            <p class="carName">${modelo}</p>
            <p class="carPrice">R$${valor},00</p>
            </div>
            `
        }


    //OPEN MODAL
    let cards = document.querySelectorAll('.card-container')

    cards.forEach(card => {
        card.onclick = () => {
            let carId = card.getAttribute('data-car')
            
            background.classList.add('open')
            modal.classList.add('open')

            body.style.overflow = 'hidden'
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })

            printModal(carId)
        }
    });
}


// MODAL
function printModal(carId) {

    let carSelected = objects.find(car => {
        return car.id == carId
    })

    
    let modalModel = document.querySelector('.modal-model')
    let modalValor = document.querySelector('.modal-valor')
    let modalDescricao = document.querySelector('.modal-descricao')
    let modalImage = document.querySelector('.modal-image')

    let modelo = carSelected.modelo
    let valor = carSelected.valor
    let descricao = carSelected.descricao
    let foto = carSelected.foto

    modalModel.innerHTML = modelo
    modalValor.innerHTML = valor
    modalDescricao.innerHTML = descricao
    modalImage.setAttribute('src', `https://imdev.azurewebsites.net/vendarro/img//${foto}`)

    //CLOSE MODAL
    let buttonX = document.querySelector('.modal-x')
    let background = document.querySelector('#background')

    //CLOSE WITH X BUTTON
    buttonX.addEventListener('click', function () {
        closeModal()
    })

    //CLOSE WHEN CLICK ON BACKGROUND
    background.addEventListener('click', function () {
        closeModal()
    })

    //CLOSE WHEN PRESS ESC
    document.body.addEventListener('keydown', function(event){
        let keyCode = event.keyCode
        if(keyCode == 27){
            closeModal()
        }
    });
}

//FUNCTION TO CLOSE MODAL
function closeModal() {
    modal.classList.remove('open')
    background.classList.remove('open')
    body.style.overflow = 'auto'
}




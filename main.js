// CAPTURING ELEMENTS AND DEFINING GLOBAL VARIABLES


let body = document.querySelector('body')
let modal = document.querySelector('.modal')
let search = document.querySelector('.search')
let carsContainer = document.querySelector('.cars-container')
let hide = document.querySelector('.hide')
let background = document.querySelector('#background')

//OBJECTS CARS LIST 
fetch('database.json')
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
        return obj.name.toLowerCase().includes(searchValue)
    })

    listCars(objectsFiltered)

}

carsContainer.innerHTML = 'Buscando carros...'

//LISTING CARS

function listCars(cars = objects) {

    let foundCars = document.querySelector('.found-cars p')
    foundCars.textContent = `Carros encontrados: ${cars.length}`

    if (cars.length == 0) {
        carsContainer.innerHTML = '<h1>nenhum carro foi encontrado</h1>'
        return
    }

    //CREATING CARDS

    carsContainer.innerHTML = ``

    for (let i in cars) {

        let name = cars[i].name
        let file = cars[i].file
        let price = cars[i].price
        let id = cars[i].id

        carsContainer.innerHTML += `
        <div class="card-container" data-car=${id}>
        <img src="images/${file}" alt="${name}">
        <p class="carName">${name}</p>
        <p class="carPrice">R$${price},00</p>
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

listCars();


// MODAL      

function printModal(carId) {

    let carSelected = objects.find(car => {
        return car.id == carId
    })

    
    let modalName = document.querySelector('.modal-name')
    let modalPrice = document.querySelector('.modal-price')
    let modalDescription = document.querySelector('.modal-description')
    let modalImage = document.querySelector('.modal-image')

    let name = carSelected.name
    let price = carSelected.price
    let description = carSelected.description
    let file = carSelected.file

    modalName.innerHTML = name
    modalPrice.innerHTML = price
    modalDescription.innerHTML = description
    modalImage.setAttribute('src', `images/${file}`)

    //CLOSE MODAL
    let buttonX = document.querySelector('.modal-x')
    let background = document.querySelector('#background')

    //CLOSE WITH X BUTTON
    buttonX.addEventListener('click', function () {
        closeModal()
    })

    //CLOSE WHEN CLICK ON BACKGROUND AROUND THE MODAL
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

function closeModal() {
    modal.classList.remove('open')
    background.classList.remove('open')
    body.style.overflow = 'auto'
}




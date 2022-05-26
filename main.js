// CAPTURING ELEMENTS AND DEFINING GLOBAL VARIABLES


let body = document.querySelector('body')
let modal = document.querySelector('.modal')
let search = document.querySelector('.search')
let carsContainer = document.querySelector('.cars-container')
let hide = document.querySelector('.hide')

//OBJECTS CARS LIST
const objects = [
    {
        "id": 1,
        "name": "Ford Fusion 2014",
        "description": "Esse carro de 2014 levou muita belezinha para o prezunic comprar o arroz quando era barato",
        "file": "fusion.jpg",
        "price": 45000.00
    },
    {
        "id": 2,
        "name": "Chevrolet Tracker 2021",
        "description": "Apesar de ele ter tracker no nome, pode ficar tranquilo que não estamos te trackeando rsrs",
        "file": "GM-tracker_2021.jpg",
        "price": 90000.00
    },
    {
        "id": 3,
        "name": "Hyundai HB20 2020",
        "description": "Você quer 4 rodas? Ele tem! Você quer 4 portas? Talvez ele tenha! Você quer economia? Não tem :/",
        "file": "hb20.jpg",
        "price": 60000.00
    },
    {
        "id": 4,
        "name": "Jeep Renegade MOAB 2018",
        "description": "Vai ali na rua e espera 3 minutos. Só com isso, te convenci a comprar né? TODO MUNDO USA, simplesmente a havaiana automobilística.",
        "file": "renegade.jpg",
        "price": 145000.00
    },
    {
        "id": 5,
        "name": "Hyundai Tucson 2022",
        "description": "Bem mais bonita que as anteriores, carinha de kicks",
        "file": "tucson.jpg",
        "price": 230000.00
    }
]

//FILTERING CARS

search.onkeyup = function carsFilter() {
    let searchValue = search.value.toLowerCase()

    let objectsFiltered = []

    objectsFiltered = objects.filter(obj => {
        return obj.name.toLowerCase().includes(searchValue)
    })

    listCars(objectsFiltered)

}

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
            hide.style.display = 'flex'
            modal.style.display = 'flex'
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
        hide.style.display = 'none'
        modal.style.display = 'none'
        body.style.overflow = 'auto'
    })

    //CLOSE WHEN CLICK ON BACKGROUND AROUND THE MODAL
    background.addEventListener('click', function () {
        hide.style.display = 'none'
        modal.style.display = 'none'
        body.style.overflow = 'auto'
    })

    //CLOSE WHEN PRESS ESC
    document.body.addEventListener('keydown', function(event){
        let keyCode = event.keyCode
        if(keyCode == 27){
            hide.style.display = 'none'
            modal.style.display = 'none'
            body.style.overflow = 'auto'  
        }
    });
}






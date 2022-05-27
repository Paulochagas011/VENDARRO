// CAPTURING ELEMENTS AND DEFINING GLOBAL VARIABLES


let body = document.querySelector('body')
let modal = document.querySelector('.modal')
let search = document.querySelector('.search')
let carsContainer = document.querySelector('.cars-container')
let hide = document.querySelector('.hide')
let background = document.querySelector('#background')

//OBJECTS CARS LIST 

// let objects = [
//     {
//         "id": 1,
//         "name": "Ford Fusion 2014",
//         "description": "Esse carro de 2014 levou muita belezinha para o prezunic comprar o arroz quando era barato",
//         "file": "fusion.jpg",
//         "price": 45000.00
//     },
//     {
//         "id": 2,
//         "name": "Chevrolet Tracker 2021",
//         "description": "Apesar de ele ter tracker no nome, pode ficar tranquilo que não estamos te trackeando rsrs",
//         "file": "GM-tracker_2021.jpg",
//         "price": 90000.00
//     },
//     {
//         "id": 3,
//         "name": "Hyundai HB20 2020",
//         "description": "Você quer 4 rodas? Ele tem! Você quer 4 portas? Talvez ele tenha! Você quer economia? Não tem :/",
//         "file": "hb20.jpg",
//         "price": 60000.00
//     },
//     {
//         "id": 4,
//         "name": "Jeep Renegade MOAB 2018",
//         "description": "Vai ali na rua e espera 3 minutos. Só com isso, te convenci a comprar né? TODO MUNDO USA, simplesmente a havaiana automobilística.",
//         "file": "renegade.jpg",
//         "price": 145000.00
//     },
//     {
//         "id": 5,
//         "name": "Hyundai Tucson 2022",
//         "description": "Bem mais bonita que as anteriores, carinha de kicks",
//         "file": "tucson.jpg",
//         "price": 230000.00
//     },
//     {
//         "id": 6,
//         "name": "Fusca Gamer",
//         "description": "um fusquinha gamer raro do balacobaco, não pode ser comprado pois ninguém é digno de te-lo mas você pode aprecia-lo por um tempo :)",
//         "file": "fusquinha-gamer.jpg",
//         "price": "muito caro"
//     }
//  ]

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
            return obj.name.toLowerCase().includes(searchValue)
        })
        
        listCars(objectsFiltered)
        
    }
    
    carsContainer.innerHTML = 'Buscando carros...'
    
    //LISTING CARS
    
    function listCars(cars = objects) {
    
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

listCars();


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




//data staffs section
let staffCards = document.getElementById('cards');
let btnAddWorker = document.querySelector('.btnAddWorker');
///data of form
let form = document.getElementById('formAddWorker');
let nom = document.getElementById('workerName');
let role = document.getElementById('workerRole');
let image = document.getElementById('inputImageWorker');
let btnClose = document.querySelector('.close');
let imageWorker = document.getElementById('imageWorker');

let company = document.getElementById('workerExperienceCompany');
let workerExperienceRole = document.getElementById('workerExperienceRole');
let dateDebutExperience = document.getElementById('dateDebutExperience');
let dateFinExperience = document.getElementById('dateFinExperience');
let btnAnnuler = document.getElementById('btnAnnuler');

let errorParagraphe = document.querySelectorAll('#formAddWorker .errorMessage');

//data for rooms section
let receptionSalle =[];
let salleServeur=[];
let salleSécurité=[];
let manager=[];
let btnsAddToRoom = document.querySelectorAll('#rooms .room-item .addToRoom');
let receptionRoom = document.querySelector('.room-3');

//data for modal section
let modalSection = document.getElementById('modal');
let modalContent = document.getElementById('modalContent');


//local storage
let workers;
if (localStorage.getItem('workers') != null) {
    workers = JSON.parse(localStorage.getItem('workers'))
} else {
    workers = [];
}
showWorkers();

//REGEX
const nameRegex = /^[A-Za-z\s'-]{2,}$/;
const urlRegex = /^(http(s)?:\/\/)?[\w.-]+\.[\w.-]+(\/[\w.-]*)*\.(jpg|jpeg|png|gif|webp)$/i;
const companyRegex = /^[A-Za-z0-9\s'-]{2,}$/;

//Afficher/cacher le formulaire 
btnAddWorker.addEventListener('click', () => {
    document.getElementById('formulaire').style.display = "flex";
})
btnClose.addEventListener('click', () => {
    document.getElementById('formulaire').style.display = "none";
})


//show data
function showWorkers() {
    staffCards.innerHTML = workers.map((worker, index) =>
        `
            <div class="cardStaff" data-id="${index}">
                    <div class="cardInfo">
                        <img src='${worker.image}' class="imgCard">
                        <div>
                            <h3>${worker.nom}</h3>
                            <p>${worker.role}</p>
                        </div>
                    </div>
                    <button class="btnEditStaff">Edit</button>
            </div> 

        `
    ).join("")
}

//formulaire submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newExperience = {
        company: company.value,
        workerExperienceRole: workerExperienceRole.value,
        dateDebutExperience: dateDebutExperience.value,
        dateFinExperience: dateFinExperience.value,
    }
    let newWorker = {
        nom: nom.value,
        role: role.value,
        image: imageWorker.src,
        experience: newExperience,
    }

    //validation avec regex
    let validationMessages = "Veuillez vérifiiez les champs suivant:\n";
    let isValid = true;
    if (nom.value == "" || !nameRegex.test(nom.value)) {
        errorParagraphe[0].innerHTML = "Le nom doit contenir au moins 2 lettres."
        errorParagraphe[0].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[0].style.display = "none";
    }
    if (role.value == "" || role.value == "Option") {
        errorParagraphe[1].innerHTML = "Veuillez saisir un role principal."
        errorParagraphe[1].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[1].style.display = "none";
    }
    /*  if (imageWorker.src && imageWorker.src !== "" && !urlRegex.test(imageWorker.src)) {
        validationMessages += "L'URL de l'image n'est pas valide (doit être jpg, png, gif, ou webp).\n";
        isValid = false;
    } */
    if (dateDebutExperience.value > dateFinExperience.value) {
        errorParagraphe[2].innerHTML = "La date de début de l'expérience ne peut pas être après la date de fin."
        errorParagraphe[2].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[2].style.display = "none";
    }

    if (!isValid) {
        return;
    } else {
        workers.push(newWorker);
        localStorage.setItem('workers', JSON.stringify(workers))
        showWorkers();
        form.reset();
        
        /*      imageWorker.style.display = "none"; */
        document.getElementById('formulaire').style.display = "none";
        console.log(workers);
        console.log(errorParagraphe);

    }


})

//L'affichage de l'image
function changeImage(src) {
    /* imageWorker.src=URL.createObjectURL(image.files[0]); */
    if (src == "") {
        imageWorker.src = "images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
    } else {
        imageWorker.src = src;
        imageWorker.style.display = "block";
    }
}


//L'etape de diviser les employées
let assignRoom=null;
btnsAddToRoom.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalSection.style.display = "flex";
        modalContent.innerHTML = `<h3>Select worker to assign</h3>${workers.map((worker, index) =>
            `
            <div class="cardStaff modalCards" data-id="${index}">
            <div class="cardInfo">
            <img src='${worker.image}' class="imgCard">
            <div>
            <h3>${worker.nom}</h3>
            <p>${worker.role}</p>
            </div>
            </div>
            <button class="btnEditStaff">Edit</button>
            </div> 
            `
        ).join("")
            }
    <button id="btnCloseModal">Close</button>
    `
        console.log(btn.dataset.action);     
        assignRoom=btn.dataset.action;
        document.getElementById("btnCloseModal").addEventListener('click', () => {
            modalSection.style.display = "none";
        })
    });
});

modalSection.addEventListener('click', (e) => {   
    let clickedCard = e.target.closest('.modalCards');
    if (clickedCard) {
        let idAssigned = clickedCard.dataset.id;
        let workerRole=workers[idAssigned].role;
        
        console.log(clickedCard.closest('room-item'));
        
        //salle de reception
        if(assignRoom=="assignToRéceptionRoom"){
             if (workerRole == "Réceptionniste"||workerRole == "Manager") {
                let [workerAssigne] = workers.splice(idAssigned, 1);
                receptionSalle.push(workerAssigne);
                assignToRoom(receptionSalle, 'room-3');
            }  
            else {
                alert("you should assign just receptionniste or manager" );
            }

            console.log(manager);
        }

        //salle des serveurs
        if(assignRoom=="assignToServerRoom"){
            if(workerRole=="Technicien IT"||workerRole == "Manager"){
                let [workerAssigned]=workers.splice(idAssigned,1);
                salleServeur.push(workerAssigned);
                assignToRoom(salleServeur,"room-4");
            }else{
                alert("you should assign just technicien it or manager");
            }
        }

        //salle de securité
        if(assignRoom=="assignToSecurityRoom"){
            if(workerRole=="Agent de sécurité"||workerRole == "Manager"){
                let [workerAssigned]=workers.splice(idAssigned,1);
                salleSécurité.push(workerAssigned);
                assignToRoom(salleSécurité,"room-5")
                
            }else{
                alert("you should assign just agent sécurité or manager");
            }
        }
           
        modalSection.style.display="none";
        localStorage.setItem('workers',JSON.stringify(workers));
        showWorkers();
    }
})

//fonction pour ajouter chaque employer à son salle 
function assignToRoom(workers,roomClass){
    document.querySelector('.'+roomClass+' div').innerHTML=`${workers.map((worker, index) =>
            `
            <div class="cardStaff modalCards" data-id="${index}">
            <div class="cardInfo">
            <img src='${worker.image}' class="imgCard">
            <div>
            <h3>${worker.nom}</h3>
            <p>${worker.role}</p>
            </div>
            </div>
            <button class="deleteWorker" type="button"data-room-index="${index}" data-room-array-name="${roomClass}">&#x2715</button>
            </div> 
            `
        ).join("")
            }

    `
}

//fonction pour retirer un employé depuis une salle 
document.getElementById('rooms').addEventListener('click',(e)=>{
    let btnDelete=e.target.closest('.deleteWorker');
    let cardStaff = btnDelete.closest('.cardStaff');
    if(btnDelete){
        let index=parseInt(btnDelete.dataset.roomIndex);
        let roomName=btnDelete.dataset.roomArrayName;
        //
        let arrayName=null;
        switch (roomName) {
            case "room-3" :
                arrayName=receptionSalle;
                break;
            case "room-4" :
                arrayName=salleServeur;
                break;
            case "room-5" :
                arrayName=salleSécurité;
                break;
            default:
                break;
        }
        //retirer depuis la salle et l'ajout chez unssigned list
        let [workerUnssigned]=arrayName.splice(index,1);
        workers.push(workerUnssigned);
        localStorage.setItem('workers', JSON.stringify(workers));
        cardStaff.remove();
        showWorkers();        
    }

})
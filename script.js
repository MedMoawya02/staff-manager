//data staffs section
let staffCards = document.getElementById('cards');
let btnAddWorker = document.querySelector('.btnAddWorker');
let inputSearchEmp=document.getElementById('inputSearchEmp');
///data of form
let form = document.getElementById('formAddWorker');
let nom = document.getElementById('workerName');
let role = document.getElementById('workerRole');
let image = document.getElementById('inputImageWorker');
let email = document.getElementById('workerEmail');
let tel = document.getElementById('workerTel');
let btnClose = document.querySelector('.close');
let imageWorker = document.getElementById('imageWorker');

let company = document.getElementById('workerExperienceCompany');
let workerExperienceRole = document.getElementById('workerExperienceRole');
let dateDebutExperience = document.getElementById('dateDebutExperience');
let dateFinExperience = document.getElementById('dateFinExperience');
let btnAnnuler = document.getElementById('btnAnnuler');
let btnAddExperience = document.getElementById('btnAddExperience');

let errorParagraphe = document.querySelectorAll('#formAddWorker .errorMessage');

//list pour les experiences
let listExperience = [];

//data for rooms section
let conferenceSalle = [];
let receptionSalle = [];
let salleServeur = [];
let salleSécurité = [];
let manager = [];
let sallePersonnel=[];
let salleArchives = [];
let btnsAddToRoom = document.querySelectorAll('#rooms .room-item .addToRoom');
let receptionRoom = document.querySelector('.room-3');

//data for modal section
let modalSection = document.getElementById('modal');
let modalContent = document.getElementById('modalContent');

//pour la partie de l'edit 
let editIndex = null;

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
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const telRegex = /^\+?(\d{1,3})?[-.\s]?(\(\d{1,4}\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,10}$/;
const companyRegex = /^[A-Za-z0-9\s'-]{2,}$/;

//Afficher/cacher le formulaire 
btnAddWorker.addEventListener('click', () => {
    document.getElementById('formulaire').style.display = "flex";
})
btnAnnuler.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('formulaire').style.display = "none";
})
btnClose.addEventListener('click', () => {
    document.getElementById('formulaire').style.display = "none";
})


//show data
function showWorkers() {
    console.log(workers)
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
                    <button class="btnEditStaff" data-id="${index}">Edit</button>
            </div> 

        `
    ).join("");
}



//logique qui permet l'ajout des plusieurs experiences pour chaque employée
btnAddExperience.addEventListener('click', (e) => {
    e.preventDefault();
    let errorExperience = "";
    let newExperience = {
        company: company.value,
        workerExperienceRole: workerExperienceRole.value,
        dateDebutExperience: dateDebutExperience.value,
        dateFinExperience: dateFinExperience.value,
    }
    if (company.value == "" || workerExperienceRole.value == "Option" || dateDebutExperience.value == "" || dateFinExperience.value == "") {
        errorExperience = "veuillez remplir tous les champs apres l'ajout de votre experinces."
    }
    else if (dateDebutExperience.value > dateFinExperience.value) {
        errorExperience = "La date de début de l'expérience ne peut pas être après la date de fin."
    }
    else {
        listExperience.push(newExperience);
        company.value = "";
        workerExperienceRole.value = "Option";
        dateDebutExperience.value = "";
        dateFinExperience.value = "";
        document.getElementById('errorExperience').style.display = "none";
    }
    document.getElementById('errorExperience').innerHTML = errorExperience;
    if (errorExperience != "") {
        document.getElementById('errorExperience').style.display = "block";
    } else {
        document.getElementById('errorExperience').style.display = "none";
    }
})


//formulaire submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let newWorker = {
        nom: nom.value,
        role: role.value,
        image: imageWorker.src,
        email: email.value,
        tel: tel.value,
        experience: listExperience,
    }

    //validation avec regex
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
    if (email.value == "" || !emailRegex.test(email.value)) {
        errorParagraphe[2].innerHTML = "Email invalid."
        errorParagraphe[2].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[2].style.display = "none";
    }
    if (tel.value == "" || !telRegex.test(tel.value)) {
        errorParagraphe[3].innerHTML = "Numero du telephone incorrect."
        errorParagraphe[3].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[3].style.display = "none";
    }
    if (dateDebutExperience.value > dateFinExperience.value) {
        errorParagraphe[4].innerHTML = "La date de début de l'expérience ne peut pas être après la date de fin."
        errorParagraphe[4].style.display = "block";
        isValid = false;
    } else {
        errorParagraphe[4].style.display = "none";
    }

    if (!isValid) {
        return;
    } 
    
    //la soumission de l'edit
    if (editIndex !== null) {
        workers[editIndex] = newWorker;
        editIndex=null;
        document.getElementById('btnSaveWorker').innerHTML = "Sauvegarder";
        document.getElementById('experienceInputs').style.display = "block";
    } else {
        workers.push(newWorker);
    }
    localStorage.setItem('workers', JSON.stringify(workers))
    showWorkers();
    form.reset();
    document.getElementById('formulaire').style.display = "none";
    listExperience = [];
})


//L'affichage de l'image
function changeImage(src) {
    /* imageWorker.src=URL.createObjectURL(image.files[0]); */
    if (src == "") {
        imageWorker.src = "images/avatar.jpg";
    } else {
        imageWorker.src = src;
        imageWorker.style.display = "block";
    }
}

//L'etape de diviser les employées
let assignRoom = null;
btnsAddToRoom.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalSection.style.display = "flex";
        assignRoom = btn.dataset.action;
        console.log(assignRoom);
     
        if(assignRoom=="assignToConferenceRoom"||assignRoom=="assignToStaffRoom"){       
            let empFiltred=workers.filter(emp=>{return emp.role!=="Option"});
            showModal(empFiltred);
        }

            if(assignRoom=="assignToServerRoom"){       
            let empFiltred=workers.filter(emp=>{return emp.role=="Technicien IT"||emp.role=="Manager"||emp.role=="Nettoyage"});
            showModal(empFiltred);
        }

        if(assignRoom=="assignToSecurityRoom"){       
            let empFiltred=workers.filter(emp=>{return emp.role=="Agent de sécurité"||emp.role=="Manager"|| emp.role=="Nettoyage"});
            showModal(empFiltred);
        }

         if(assignRoom=="assignToRéceptionRoom"){       
            let empFiltred=workers.filter(emp=>{return emp.role=="Réceptionniste"||emp.role=="Manager"|| emp.role=="Nettoyage"});
            showModal(empFiltred);
        }

        if(assignRoom=="assignToVaultRoom"){       
            let empFiltred=workers.filter(emp=>{return emp.role!=="Nettoyage"});
            showModal(empFiltred);
        }

        localStorage.setItem('workers',JSON.stringify(workers));

        //la fermuture du modal
        document.getElementById("btnCloseModal").addEventListener('click', () => {
            modalSection.style.display = "none";
        })
    });
});
function showModal(emp){
     modalContent.innerHTML = `<h3>Select worker to assign</h3>${emp.map((worker, index) =>
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
}


modalSection.addEventListener('click', (e) => {
    let clickedCard = e.target.closest('.modalCards');
    if (clickedCard) {
        let idAssigned = clickedCard.dataset.id;
        let workerRole = workers[idAssigned].role;

        //salle de conference
        if (assignRoom == "assignToConferenceRoom") {
            if (workerRole != "Option") {
                let [workerAssigne] = workers.splice(idAssigned, 1);
                conferenceSalle.push(workerAssigne);
                assignToRoom(conferenceSalle, 'room-1');
            } else {
                alert("Veuillez sélectionner un rôle valide pour ce travailleur.");
            }
        }

        //salle de reception
        if (assignRoom == "assignToRéceptionRoom") {
            if (workerRole == "Réceptionniste" || workerRole == "Manager" || workerRole == "Nettoyage") {
                let [workerAssigne] = workers.splice(idAssigned, 1);
                receptionSalle.push(workerAssigne);
                assignToRoom(receptionSalle, 'room-3');
            }
            else {
                alert("you should assign just receptionniste or manager or nettoyage");
            }
        }

        //salle des serveurs
        if (assignRoom == "assignToServerRoom") {
            if (workerRole == "Technicien IT" || workerRole == "Manager" || workerRole == "Nettoyage") {
                let [workerAssigned] = workers.splice(idAssigned, 1);
                salleServeur.push(workerAssigned);
                assignToRoom(salleServeur, "room-4");
            } else {
                alert("you should assign just technicien it or manager or nettoyage");
            }
        }

        //salle de securité
        if (assignRoom == "assignToSecurityRoom") {
            if (workerRole == "Agent de sécurité" || workerRole == "Manager" || workerRole == "Nettoyage") {
                let [workerAssigned] = workers.splice(idAssigned, 1);
                salleSécurité.push(workerAssigned);
                assignToRoom(salleSécurité, "room-5")
            } else {
                alert("you should assign just agent sécurité or manager or nettoyage");
            }
        }

        //salle des personnelles
        if(assignRoom=="assignToStaffRoom"){
            if(workerRole!="Autre"){
                let [workerAssigned]=workers.splice(idAssigned,1);
                sallePersonnel.push(workerAssigned);
                assignToRoom(sallePersonnel,'room-6')
            }else{
                alert("You cannot assign to this zone.");
            }
        }

        //salle des archives
        if (assignRoom == "assignToVaultRoom") {
            if (workerRole == "Nettoyage") {
                alert("You cannot assign nettoyage workers to this zone.");
            } else {
                let [workerAssigne] = workers.splice(idAssigned, 1);
                salleArchives.push(workerAssigne);
                assignToRoom(salleArchives, 'room-7');
            }
        }

        modalSection.style.display = "none";
        localStorage.setItem('workers', JSON.stringify(workers));
        showWorkers();
    }
})

//fonction pour ajouter chaque employer à son salle 
function assignToRoom(workers, roomClass) {
    document.querySelector('.' + roomClass + ' div').innerHTML = `${workers.map((worker, index) =>
        `
            <div class="cardStaff " data-id="${index}">
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
document.getElementById('rooms').addEventListener('click', (e) => {
    let btnDelete = e.target.closest('.deleteWorker');
    let arrayName = null;
    if (btnDelete) {
       /*  e.stopPropagation(); */
        let index = parseInt(btnDelete.dataset.roomIndex);
        let roomName = btnDelete.dataset.roomArrayName;
        //
        switch (roomName) {
            case "room-1":
                arrayName = conferenceSalle;
                break;
            case "room-3":
                arrayName = receptionSalle;
                break;
            case "room-4":
                arrayName = salleServeur;
                break;
            case "room-5":
                arrayName = salleSécurité;
                break;
            case "room-6":
                arrayName = sallePersonnel;
                break;
            case "room-7":
                arrayName = salleArchives;
                break;
            default:
                break;
        }
        //retirer depuis la salle et l'ajout chez unssigned list
        let [workerUnssigned] = arrayName.splice(index, 1);
        workers.push(workerUnssigned);
        assignToRoom(arrayName, roomName);
        localStorage.setItem('workers', JSON.stringify(workers));
        showWorkers();
    }
})


//l'affichage du detail d'un worker et la modification
staffCards.addEventListener('click', (e) => {
    let card = e.target.closest('.cardStaff');
    let btnEdit = e.target.closest('.btnEditStaff');

    //l'affichage le formulaire pour editer
    if (btnEdit) {
        console.log(btnEdit);
       /*  e.stopPropagation(); */
        let index = Number(btnEdit.dataset.id);
        editIndex = index;
        let workerToEdit = workers[index];
        console.log(workerToEdit);
        document.getElementById('formulaire').style.display = "flex";
        nom.value = workerToEdit.nom;
        role.value = workerToEdit.role;
        imageWorker.src = workerToEdit.image;
        email.value = workerToEdit.email;
        tel.value = workerToEdit.tel;
        listExperience = [...workerToEdit.experience];

        document.getElementById('btnSaveWorker').innerHTML = "Modifier";
        document.getElementById('experienceInputs').style.display = "none";
        return;
    }

    //l'affichage du detail
    if (card) {
        let index = parseInt(card.dataset.id);
        let workerSelected = workers[index];
        modalSection.style.display = "flex";
        detailWorker(workerSelected);
    }

});
function detailWorker(workerSelected) {
    modalContent.innerHTML = `
        <div class="worker-details">
            <h2>Détails du Travailleur</h2>
            
            <div class="info-group">
                <label>Nom :</label>
                <p><strong>${workerSelected.nom}</strong></p>
            </div>
            
            <div class="info-group">
                <label>Rôle :</label>
                <p>${workerSelected.role}</p>
            </div>

            <div class="info-group">
                <label>Email :</label>
                <p>${workerSelected.email}</p>
            </div>

            <div class="info-group">
                <label>Téléphone :</label>
                <p>${workerSelected.tel}</p>
            </div>
            <h3>Expériences professionnelles</h3>
            <div class="experiences-list">
                ${workerSelected.experience.length > 0
            ? workerSelected.experience.map(exp => `
                        <div class="experience-item">
                            <h4>${exp.workerExperienceRole} chez ${exp.company}</h4>
                            <p>Du ${exp.dateDebutExperience} au ${exp.dateFinExperience}</p>
                        </div>
                    `).join('')
            : '<p>Aucune expérience enregistrée pour ce travailleur.</p>'
        }
            </div>
        </div>
        <button id="btnCloseModalDetail">Close</button>
    `;
    document.getElementById('btnCloseModalDetail').addEventListener('click', () => {
        modalSection.style.display = "none";
    })
}

//search
inputSearchEmp.addEventListener('keyup',(e)=>{
    let value=e.target.value.toLowerCase();
    let listFilter=workers.filter(worker=>worker.nom.toLowerCase().includes(value.trim()));
    if(!listFilter){
        return;
    }else{
        staffCards.innerHTML = listFilter.map((worker, index) =>
        `
            <div class="cardStaff" data-id="${index}">
                    <div class="cardInfo">
                        <img src='${worker.image}' class="imgCard">
                        <div>
                            <h3>${worker.nom}</h3>
                            <p>${worker.role}</p>
                        </div>
                    </div>
                    <button class="btnEditStaff" data-id="${index}">Edit</button>
            </div> 

        `
    ).join("");
    } 
})
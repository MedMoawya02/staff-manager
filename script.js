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

let errorParagraphe = document.querySelectorAll('#formAddWorker .errorMessage');

//local storage
let workers;
if (localStorage.getItem('workers')) {
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
            <div class="cardStaff">
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
    }else{
        errorParagraphe[0].style.display = "none";
    }
    if (role.value == "" || role.value == "Option") {
        errorParagraphe[1].innerHTML = "Veuillez saisir un role principal."
        errorParagraphe[1].style.display = "block";
        isValid = false;
    }else{
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
    }else{
        errorParagraphe[2].style.display = "none";
    }

    if (!isValid) {
        return;
    } else {
        workers.push(newWorker);
        localStorage.setItem('workers', JSON.stringify(workers))
        showWorkers();
        form.reset();
        imageWorker.src = "";
        imageWorker.style.display = "none";
        document.getElementById('formulaire').style.display = "none";
        errorParagraphe.style.display="none";
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
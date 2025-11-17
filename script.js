//data staffs section
let staffCards=document.getElementById('cards');
let btnAddWorker=document.querySelector('.btnAddWorker');
///data of form
let form=document.getElementById('formAddWorker');
let nom=document.getElementById('workerName');
let role=document.getElementById('workerRole');
let image=document.getElementById('inputImageWorker');
let btnClose=document.querySelector('.close');
let imageWorker=document.getElementById('imageWorker');

let company=document.getElementById('workerExperienceCompany');
let workerExperienceRole=document.getElementById('workerExperienceRole');
let dateDebutExperience=document.getElementById('dateDebutExperience');
let dateFinExperience=document.getElementById('dateFinExperience');
//
let workers;
if(localStorage.getItem('workers')){
    workers=JSON.parse(localStorage.getItem('workers'))
}else{
    workers=[];
}
showWorkers();
//Afficher/cacher le formulaire 
btnAddWorker.addEventListener('click',()=>{
    document.getElementById('formulaire').style.display="flex";
})
btnClose.addEventListener('click',()=>{
    document.getElementById('formulaire').style.display="none";
})


//show data
function showWorkers(){
    staffCards.innerHTML=workers.map((worker,index)=>
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
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let newExperience={
        company:company.value,
        workerExperienceRole:workerExperienceRole.value,
        dateDebutExperience:dateDebutExperience.value,
        dateFinExperience:dateFinExperience.value,
    }
    let newWorker={
        nom:nom.value,
        role:role.value,
        image:imageWorker.src,
        experience:newExperience,
    }
    if(nom.value==""||role.value==""){
        alert("Veuillez saisez une value")
    }else{
        workers.push(newWorker);
        localStorage.setItem('workers',JSON.stringify(workers))    
        showWorkers();
        form.reset();
        imageWorker.src="";
        imageWorker.style.display="none";
        document.getElementById('formulaire').style.display="none";
        console.log(workers);
        
    }  
})

//L'affichage de l'image
function changeImage(){
    imageWorker.src=URL.createObjectURL(image.files[0]);
    imageWorker.style.display="block";
}
//data staffs section
let staffCards=document.getElementById('cards');
let btnAddWorker=document.querySelector('.btnAddWorker');
///data of form
let form=document.getElementById('formAddWorker');
let nom=document.getElementById('workerName');
let role=document.getElementById('workerRole');
let image=document.getElementById('inputImageWorker');
let btnClose=document.querySelector('.close');
//
let workers=[];
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
                        <img src= class="imgCard">
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
    let newWorker={
        nom:nom.value,
        role:role.value,
        image:image.value,
    }
    if(nom.value==""||role.value==""){
        alert("Veuillez saisez une value")
    }else{
        workers.push(newWorker)

    }
    console.log(newWorker);
    console.log(workers);
    showWorkers();
    form.reset();
    
})
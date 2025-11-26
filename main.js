const floorPlan = {
    zones: [
        { name: "Reception", capacity: 2, currentEmployees: [], required: true },
        { name: "Server Room", capacity: 1, currentEmployees: [3], required: true },
        { name: "Conference", capacity: 8, currentEmployees: [1, 2], required: false }
    ],
    employees: [
        { id: 1, name: "Mike Brown", role: "Manager" },
        { id: 2, name: "Lisa Wang", role: "Receptionist" },
        { id: 3, name: "Tom Jones", role: "IT Technician" }
    ]
};
function setEmp(id,zone){
    let empFiltred=floorPlan.employees.filter(emp=>{return emp.id==id });
    floorPlan.zones.find(emp=>{return })

}
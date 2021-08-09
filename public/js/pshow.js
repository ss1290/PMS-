const List3=document.querySelector('#List3')
fetch(`/patient/show?token=${token}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.patients.length;i++){
            List3.insertAdjacentHTML("beforeend",`<td></td>
                        <td >${data.patients[i].patientId}</td>
                        <td>${data.patients[i].name}</td>
                        <td>${data.patients[i].age}</td>
                        <td>${data.patients[i].gender}</td>
                        <td>${data.patients[i].bloodGroup}</td>
                        <td>${data.patients[i].birthDate}</td>
                        `)
                    }
                })
            })
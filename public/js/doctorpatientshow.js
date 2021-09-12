const list3=document.querySelector('#list3')
const list4=document.querySelector('#list4')
const search=document.getElementById('patientsearch')
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
var {token} = Qs.parse(location.search,{ignoreQueryPrefix:true})
fetch(`/patient/show?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.patients.length;i++){
            list3.insertAdjacentHTML('beforeend',`<tr><td>${(pageNumber*20+i+1)}</td>
            <td>${data.patients[i].patientId}</td>
            <td>${data.patients[i].name}</td>
            <td>${data.patients[i].age}</td>
            <td>${data.patients[i].gender}</td>
            <td>${data.patients[i].bloodGroup}</td>
            <td>${data.patients[i].birthDate}</td>
            </tr>`)
        }
        tr = list3.getElementsByTagName("tr");
        if(tr.length<20){
            document.getElementById('edit2').style.display="none"
        }else if(tr.length==20){
            document.getElementById('edit2').style.display=""
        }
    })
})
fetch(`/patient/filter?token=${token}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.patients.length;i++){
            list4.insertAdjacentHTML('beforeend',`<tr><td>${(i+1)}</td>
            <td>${data.patients[i].patientId}</td>
            <td>${data.patients[i].name}</td>
            <td>${data.patients[i].age}</td>
            <td>${data.patients[i].gender}</td>
            <td>${data.patients[i].bloodGroup}</td>
            <td>${data.patients[i].birthDate}</td>
            </tr>`)
        }
    })
})
search.onkeyup=function(){
    if(search.value){
        document.getElementById('patientview').style.display="none"
        document.getElementById('patientfilterlist').style.display=""
    }else{
        document.getElementById('patientfilterlist').style.display="none"
        document.getElementById('patientview').style.display=""
    }
    var filter, table, tr, td, i, txtValue;
    filter = search.value.toUpperCase();
    table = document.getElementById("patientfilterlist");
    tr = table.getElementsByTagName("tr");
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[2];
        if(td){
            txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) >-1) {
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }
        }
    }
}
if(pageNumber>0){
    document.getElementById('edit3').style.display=""
}else{
    document.getElementById('edit3').style.display="none"
}
function next(){
    var page1=parseInt(pageNumber,10)+1
    location.href=`/doctor/patient?&token=${token}&page=${page1}`
}
function back(){
    var previouspage=parseInt(pageNumber,10)-1
    location.href=`/doctor/patient?&token=${token}&page=${previouspage}`
}
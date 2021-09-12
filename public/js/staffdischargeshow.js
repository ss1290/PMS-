const list5=document.querySelector('#list5')
const list6=document.querySelector('#list6')
const search=document.getElementById('dischargesearch')
var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
fetch(`/discharge/show?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.Discharges.length;i++){
           list5.insertAdjacentHTML("beforeend",`<tr><td>${(pageNumber*20+i+1)}</td>
           <td>${data.Discharges[i].name}</td>
            <td>${data.Discharges[i].patientWard}</td>
            <td>${data.Discharges[i].doctor}</td>
            </tr>`)
        }
        tr = list5.getElementsByTagName("tr");
        if(tr.length<20){
            document.getElementById('edit2').style.display="none"
        }else if(tr.length==20){
            document.getElementById('edit2').style.display=""
        }
    })
})
fetch(`/discharge/filter?token=${token}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.Discharges.length;i++){
           list6.insertAdjacentHTML("beforeend",`<tr><td>${(i+1)}</td>
           <td>${data.Discharges[i].name}</td>
            <td>${data.Discharges[i].patientWard}</td>
            <td>${data.Discharges[i].doctor}</td>
            </tr>`)
        }
    })
})
search.onkeyup=function(){
    if(search.value){
        document.getElementById('dischargeview').style.display="none"
        document.getElementById('Dischargefilterlist').style.display=""
    }else{
        document.getElementById('Dischargefilterlist').style.display="none"
        document.getElementById('dischargeview').style.display=""
    }
    var filter, table, tr, td, i, txtValue;
    filter = search.value.toUpperCase();
    table = document.getElementById("Dischargefilterlist");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
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
    location.href=`/staff/discharge?&token=${token}&page=${page1}`
}
function back(){
    var previouspage=parseInt(pageNumber,10)-1
    location.href=`/staff/discharge?&token=${token}&page=${previouspage}`
}
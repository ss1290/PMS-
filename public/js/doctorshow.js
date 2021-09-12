const list1=document.querySelector('#list1')
const search=document.getElementById('doctorsearch')
const list2=document.querySelector('#list2')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
fetch(`/doctor/show?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.doctors.length;i++){
            list1.insertAdjacentHTML("beforeend",`<tr><td>${(pageNumber*20+i+1)}</td>
            <td >${data.doctors[i].name}</td>
            <td>${data.doctors[i].department}</td>
            <td><a href="/user/delete?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">remove_circle_outline</span></a><a href="/doctor/edit?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">edit</span></a></td>
            </tr>`)
        }
        tr = list1.getElementsByTagName("tr");
        if(tr.length<20){
            document.getElementById('edit2').style.display="none"
        }else if(tr.length==20){
            document.getElementById('edit2').style.display=""
        }
    })
})
fetch(`/doctor/filter?token=${token}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.doctors.length;i++){
            list2.insertAdjacentHTML("beforeend",`<tr><td>${(i+1)}</td>
            <td >${data.doctors[i].name}</td>
            <td>${data.doctors[i].department}</td>
            <td><a href="/user/delete?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">remove_circle_outline</span></a><a href="/doctor/edit?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">edit</span></a></td>
            </tr>`)
        }
    })
})
search.onkeyup=function(){
    if(search.value){
        document.getElementById('doctorview').style.display="none"
        document.getElementById('doctorfilterlist').style.display=""
    }else{
        document.getElementById('doctorfilterlist').style.display="none"
        document.getElementById('doctorview').style.display=""
    }
    var filter, table, tr, td, i, txtValue;
    filter = search.value.toUpperCase();
    table = document.getElementById("doctorfilterlist");
    tr = table.getElementsByTagName("tr");
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[1];
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
    location.href=`/admin/doctor?&token=${token}&page=${page1}`
}
function back(){
    var previouspage=parseInt(pageNumber,10)-1
    location.href=`/admin/doctor?&token=${token}&page=${previouspage}`
}


const list3=document.querySelector('#list3')
const search=document.getElementById('patientsearch')
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
var {token} = Qs.parse(location.search,{ignoreQueryPrefix:true})
fetch(`/patient/show?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.patients.length;i++){
            list3.insertAdjacentHTML('beforeend',`<tr><td></td>
                       <td>${data.patients[i].patientId}</td>
                        <td>${data.patients[i].name}</td>
                        <td>${data.patients[i].age}</td>
                        <td>${data.patients[i].gender}</td>
                        <td>${data.patients[i].bloodGroup}</td>
                        <td>${data.patients[i].birthDate}</td>
                        <td><a href="/patient/delete?token=${token}&id=${data.patients[i]._id}"<span class="material-icons">remove_circle_outline</span></a><a href="/patient/edit?token=${token}&id=${data.patients[i]._id}"><span class="material-icons">edit</span></a></td>
                        </tr>`)
                    }
                    tr = list3.getElementsByTagName("tr");
                     if(tr.length>10){
                        document.getElementById('edit2').style.display=""
                    }else if(tr.length<10){
                        document.getElementById('edit2').style.display="none"
                    }
                    search.onkeyup=function(){
                        var filter, table, tr, td, i, txtValue;
                        filter = search.value.toUpperCase();
                        table = document.getElementById("patientlist");
                        tr = table.getElementsByTagName("tr");
                        for (i = 0; i < tr.length; i++) {
                            td = tr[i].getElementsByTagName("td")[2];
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
                })
            })
            function next(){
                var page1=parseInt(pageNumber,10)+1
                location.href=`/admin/patient?&token=${token}&page=${page1}`

            }
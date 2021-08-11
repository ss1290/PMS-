const list6=document.querySelector('#list4')
const search=document.getElementById('admitsearch')
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })
fetch(`/patient/appointment?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.Appointments.length;i++){
           list6.insertAdjacentHTML("beforeend",`<td></td>
                        <td>${data.Appointments[i].name}</td>
                        <td>${data.Admits[i].patientWard}</td>
                        <td>${data.Admits[i].doctor}</td>
                        <td><a><span class="material-icons">edit</span></a></td>
                        `) 
                    }
                    tr = list4.getElementsByTagName("tr");
                    if(tr.length>10){
                        document.getElementById('edit2').style.display=""
                    }else if(tr.length<10){
                        document.getElementById('edit2').style.display="none"
                    }
                    search.onkeyup=function(){
                        var filter, table, tr, td, i, txtValue;
                        filter = search.value.toUpperCase();
                        table = document.getElementById("Admitlist");
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
                })
            })
            function next(){
                var page1=parseInt(pageNumber,10)+1
                location.href=`/admin/admit?&token=${token}&page=${page1}`

            }
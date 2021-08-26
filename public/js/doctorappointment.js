const list6=document.querySelector('#list6')
const search=document.getElementById('appointmentsearch')
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })
fetch(`/patient/appointment?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.Appointments.length;i++){
           list6.insertAdjacentHTML("beforeend",`<tr><td></td>
                        <td>${data.Appointments[i].date}</td>
                        <td>${data.Appointments[i].time}</td>
                         <td>${data.Appointments[i].name}</td>
                        </tr>`) 
                    }
                    tr = list6.getElementsByTagName("tr");
                    if(tr.length<20){
                        document.getElementById('edit2').style.display="none"
                    }else if(tr.length==20){
                        document.getElementById('edit2').style.display=""
                    }
                    search.onkeyup=function(){
                        var filter, table, tr, td, i, txtValue;
                        filter = search.value.toUpperCase();
                        table = document.getElementById("Appointmentlist");
                        tr = table.getElementsByTagName("tr");
                        for (i = 0; i < tr.length; i++) {
                            td = tr[i].getElementsByTagName("td")[3];
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
                location.href=`/doctor/appointments?&token=${token}&page=${page1}`

            }
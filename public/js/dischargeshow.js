const list5=document.querySelector('#list5')
const search=document.getElementById('dischargesearch')
var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
fetch(`/discharge/show?token=${token}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.Discharges.length;i++){
           list5.insertAdjacentHTML("beforeend",`<td></td>
                        <td>${data.Discharges[i].name}</td>
                        <td>${data.Discharges[i].patientWard}</td>
                        <td>${data.Discharges[i].doctor}</td>
                        <td><a><span class="material-icons">edit</span></a></td>
                        `)
                        }
                        tr = list5.getElementsByTagName("tr");
                        if(tr.length>10){
                        document.getElementById('edit2').style.display=""
                     }else if(tr.length<10){
                        document.getElementById('edit2').style.display="none"
                    }
                        search.onkeyup=function(){
                        var filter, table, tr, td, i, txtValue;
                        filter = search.value.toUpperCase();
                        table = document.getElementById("Dischargelist");
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
    location.href=`/admin/discharge?&token=${token}&page=${page1}`
}
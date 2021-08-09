const list1=document.querySelector('#list1')
const search=document.getElementById('doctorsearch')
var {token}=Qs.parse(location.search,{ignoreQueryPrefix:true})
var {page} = Qs.parse(location.search, { ignoreQueryPrefix: true })
var pageNumber=( Qs.parse(location.search, { ignoreQueryPrefix: true }).page)
fetch(`/doctor/show?token=${token}&page=${page}`).then((response)=>{
    response.json().then((data)=>{
        for(let i=0;i<data.doctors.length;i++){
            list1.insertAdjacentHTML("beforeend",`<td></td>
                        <td >${data.doctors[i].name}</td>
                        <td>${data.doctors[i].department}</td>
                        <td><a href="/user/delete?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">remove_circle_outline</span></a><a href="/doctor/edit?token=${token}&id=${data.doctors[i]._id}"><span class="material-icons">edit</span></a></td>
                        `)
                    }
                    tr = list1.getElementsByTagName("tr");
                    if(tr.length>10){
                        document.getElementById('edit2').style.display=""
                    }else if(tr.length<10){
                        document.getElementById('edit2').style.display="none"
                    }
        
                    search.onkeyup=function(){
                        var filter, table, tr, td, i, txtValue;
                        filter = search.value.toUpperCase();
                        table = document.getElementById("doctorlist");
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
                location.href=`/admin/doctor?&token=${token}&page=${page1}`

            }
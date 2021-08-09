var {token} = Qs.parse(location.search, { ignoreQueryPrefix: true })
function logout(){
    fetch(`/logoutUser?token=${token}`).then((response)=>{
        response.json().then((data)=>{
            alert(data.message)
            location.href = "/"
        })
    })
}
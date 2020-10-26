const currentUserUrl = 'http://localhost:8080/api/user/current'

function currentUser(url) {
    fetch(url)
        .then(response => {
            response.json().then(data => {
                let email = data.email
                let role = ""

                new Object(data.roles).forEach(e => {
                    role += e.name + " "
                })

                document.getElementById("userInfo").innerText = email
                document.getElementById("userRole").innerText = role
            })
        })
}

function currentUserInfo(url) {
    fetch(url)
        .then(response => {
            response.json().then(data => {
                let role = ""
                let temp = ""
                temp += "<tr>"
                temp += "<td>"+ data.id +"</td>"
                temp += "<td>"+ data.firstName +"</td>"
                temp += "<td>"+ data.lastName +"</td>"
                temp += "<td>"+ data.age +"</td>"
                temp += "<td>"+ data.email +"</td>"
                new Object(data.roles).forEach(e => role += e.name + " ")
                temp += "<td>"+ role +"</td>"
                temp += "</tr>"

                document.getElementById("tableBody").innerHTML = temp
            })
        })
}



currentUser(currentUserUrl)
currentUserInfo(currentUserUrl)
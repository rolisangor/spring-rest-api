const currentUserUrl = 'http://localhost:8080/api/user/current'
const allUserUrl = 'http://localhost:8080/api/user/'
const deleteUserUrl = 'http://localhost:8080/api/user/delete/'
const saveUserUrl = 'http://localhost:8080/api/user/save/'

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

function getUser(id) {
    let userUrl = allUserUrl + id
    return fetch(userUrl)
        .then(response => {
            return response.json()
        })
}

function allUsers(url) {
    fetch(url)
        .then(response => {
            response.json().then(data => {
                let temp = ""
                data.forEach(user => {
                    let role = "";
                    temp += "<tr>"
                    temp += "<td>" + user.id + "</td>"
                    temp += "<td>" + user.firstName + "</td>"
                    temp += "<td>" + user.lastName + "</td>"
                    temp += "<td>" + user.age + "</td>"
                    temp += "<td>" + user.email + "</td>"
                    new Object(user.roles).forEach(e => role += e.name + " ")
                    temp += "<td>" + role + "</td>"

                    temp += "<td>" + "<button type='button' class='btn btn-info editUser' data-toggle='model' data-target='#modelEdit' data-id=" + user.id + ">Edit</button> " + "</td>"
                    temp += "<td>" + "<button type='button' class='btn btn-danger deleteUser' data-toggle='model' data-target='#modelDelete' data-id=" + user.id + ">Delete</button> " + "</td>"

                    temp += "</tr>"

                })

                document.getElementById("tableUsers").innerHTML = temp
            })
        })
}

function editUser(id) {
    const editUserUrl = allUserUrl + id;
    fetch(editUserUrl)
        .then(response => {
            response.json().then(data => {
                document.getElementById("firstNameEdit").setAttribute("value", data.firstName)
                document.getElementById("lastNameEdit").setAttribute("value", data.lastName)
                document.getElementById("ageEdit").setAttribute("value", data.age)
                document.getElementById("emailEdit").setAttribute("value", data.email)
                document.getElementById("passwordEdit").setAttribute("value", data.password)
            })
        })
}

function deleteUser(id) {
    const Url = deleteUserUrl + id;
    fetch(Url, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn(error);
    });

}

function saveUser(url) {
    const serializeForm = function (form) {
        const obj = {};
        const formData = new FormData(form);
        for (const key of formData.keys()) {
            obj[key] = formData.get(key);
        }

        let role = obj.roles
        console.log(role)
        if (role === 'ADMIN') {
            obj.roles = [{
                "id": 1,
                "name": "ADMIN"
            },
                {
                    "id": 2,
                    "name": "USER"
                }
            ]
        } else {
            obj.roles = [{
                "id": 2,
                "name": "USER"
            }]
        }

        return obj;
    };
    document.addEventListener('submit', function (event) {

        event.preventDefault();

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(serializeForm(event.target)),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.warn(error);
        });
    });
}

currentUser(currentUserUrl)
allUsers(allUserUrl)
saveUser(saveUserUrl)


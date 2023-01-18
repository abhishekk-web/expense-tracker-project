async function signup(e) {

    try{

    e.preventDefault();

    console.log(e.target.email.value);

    const signUpDetails = {

        name  : e.target.name.value,
        email : e.target.email.value,
        password: e.target.password.value

    }

    console.log(signUpDetails);

    const response = await axios.post("http://localhost:3000/user/signup", signUpDetails);
    console.log(response);
    if(response.status === 201){

        window.location.href = "../login/login.html";
    }
    else{
        console.log("there is an error");
        throw new Error('Failed to login');
    }
        
    }

    catch(err)  {
        document.body.innerHTML += `<div style="color:red">${err}</div>`
    }

}

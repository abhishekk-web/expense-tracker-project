async function login(e) {

    try {

        e.preventDefault();

        const login = {
          email:  e.target.email.value,
          password: e.target.password.value
        }

        console.log(login);

        const response = await axios.post("http://localhost:3000/user/login", login)
        if(response.status === 200){
        
            window.location.href="../expense/expense.html";
            console.log(response);
        
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
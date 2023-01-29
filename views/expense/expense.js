

async function mySave(e) {

    try{

    e.preventDefault();

    console.log(e.target.expense.value);

    const expenses = {
        expense: e.target.expense.value,
        description: e.target.description.value,
        category: e.target.category.value,
        userId: 1
    }

    const token = localStorage.getItem("token");
    const response = await axios.post("http://localhost:3000/expense/postexpense", expenses, {headers: {"Authorization": token}})
    
    
        console.log(response);
        showUser(response.data.allData);

    }

    catch(err) {
        console.log(err);
    }

}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function premiumUser() {

        document.getElementById('rzp-button1').style.visibility = "hidden";
        document.getElementById('message').innerHTML = "You are a premiere user";
        

}

function showLeaderBoard() {

    const inputElement = document.createElement("input");
    console.log(inputElement);
    inputElement.type="button";
    console.log(inputElement.type);
    inputElement.value = 'Show Leaderboard';
    console.log(inputElement.value);
    inputElement.style = "background-color: #008CBA; color: white;  border-radius: 4px; height: 40px";
    inputElement.onclick = async() => {
        const token = localStorage.getItem('token');
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premium/showleaderboard', {headers: {'Authorization': token}});
        console.log(userLeaderBoardArray);

        var leaderboardElem = document.getElementById('leaderboard');
        leaderboardElem.innerHTML += '<h1>Leader Board</h1>';
        userLeaderBoardArray.data.users.forEach((userDetails) => {
            if(userDetails.total_cost === null){
                userDetails.total_cost = 0;
            }
          leaderboardElem.innerHTML += `<li style="text-decoration: none; font-weight: bold; color: black; border: 3px solid black; border-radius: 5px; margin-left: 350px; padding-top: 7px; width: 500px; height: 50px; margin-top: 20px;">Name - ${userDetails.name} Expense - ${userDetails.total_cost}</li>`;
        })
      }
      document.getElementById("message").appendChild(inputElement);

}

window.addEventListener("DOMContentLoaded", async () => {

    try {
        const token = localStorage.getItem("token");
        const decodedToken = parseJwt(token);
        console.log(decodedToken);
        console.log(decodedToken.isPremiumUser);
        // console.log(token);
        if(decodedToken.isPremiumUser === true ){

            premiumUser();
            showLeaderBoard();

        }
        const response = await axios.get("http://localhost:3000/expense/getexpense", {headers: {"Authorization": token}});
        console.log(response);
        response.data.data.forEach(expense => {
            showUser(expense);
        })
}

catch(err)  {
    console.log(err);

}
})

function showUser(user) {

    const parentNode = document.getElementById("listOfUsers");
    const childHTML = `<li style="text-decoration: none; font-weight: bold; color: black; border: 3px solid black; border-radius: 5px; margin-left: 350px; padding-top: 7px; width: 500px; height: 50px; margin-top: 20px;" id=${user.id}>${user.expense} ${user.description} ${user.category}
              
              <button style="background-color: #00d1b2; border-radius: 10%; border: 2px solid #00d1b2; color: white;" onclick=deleteUser('${user.id}')>delete</button>
              <button style="background-color: #00d1b2; border-radius: 10%; border: 2px solid #00d1b2; color: white;" onclick=editUser('${user.expense}','${user.description}','${user.category}','${user.id}')>Edit the User </button>

            </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
    
}

async function deleteUser(userId){

    try {
    
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/expense/deleteexpense/${userId}`, {headers: {"Authorization": token}});
            
            removeuser(userId);

    }

    catch(err) {
        console.log("error");
        console.log(err);
    }

}

function removeuser(userId){

    const parentNode = document.getElementById("listOfUsers");
    const childNodeToBeDeleted = document.getElementById(userId);
  
    parentNode.removeChild(childNodeToBeDeleted);
  
}


function editUser(expense, description, category, id) {

    document.getElementById("description").value = description;
    document.getElementById("category").value = category;
    document.getElementById("expense").value = expense;
    deleteUser(id);

}


document.getElementById("rzp-button1").onclick = async function (e) {

    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/purchase/premiummembership", {headers: {"Authorization": token}});
        console.log(response);
        var options = {

        "key": response.data.key_id,
        "order_id": response.data.status.orderid,
        "handler": async function (response) {
            console.log(response);
            const res = await axios.post('http://localhost:3000/purchase/updatetransactionstatus', { order_id: options.order_id, payment_id: response.razorpay_payment_id,},{ headers: {"Authorization": token}});
            console.log(res);
            alert(res.data.message);
            // alert('You are a premium user now');
            premiumUser();
            showLeaderBoard();
            localStorage.setItem("token", res.data.token);
        }

    };

    
    const rzp1 = new Razorpay(options);
    rzp1.open();
    console.log(options);
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        console.log(response)
        alert("Something went wrong");
    })

    }

    

    catch(err){
        console.log(err);
    }

}

async function download(e) {

    try {

        // e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/expense/download", {headers: {"Authorization": token}});
        console.log(response);
        if(response.status === 200) {
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        }
        else{
            throw new Error(response.data.message);
        }

    }

    catch(err)
    {
        console.log(err);
    }

}
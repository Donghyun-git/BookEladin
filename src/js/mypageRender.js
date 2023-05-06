window.addEventListener("load", async () => {
    const myDataJson = localStorage.getItem("myData");
    const userDataJson = localStorage.getItem("userData");
    // const guestDataJson = localStorage.getItem("guest");

    const myData = myDataJson && JSON.parse(myDataJson);
    const userData = userDataJson && JSON.parse(userDataJson);

    const userName = document.querySelector(".user-name");
    const userEmail = document.querySelector(".email");

    if (
        (myData && userData && myData.data.userName !== userData.userName) ||
        myData.data.email !== userData.email
    ) {
        userName.innerHTML = myData.data.userName;
        userEmail.innerHTML = myData.data.email;
    } else if (userData) {
        userName.innerHTML = userData.userName;
        userEmail.innerHTML = userData.email;
    }
});

for(let i=0; i=0; i){
    window.location.reload();
}
    

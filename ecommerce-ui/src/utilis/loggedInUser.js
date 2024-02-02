export const isLoggedUser=()=>{
    const accesstoken= localStorage.getItem("accesstoken");
    let isLoggedUser= false;
    if (accesstoken){
        isLoggedUser= true;
    }
    return isLoggedUser;
}
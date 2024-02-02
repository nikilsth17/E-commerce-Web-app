//return true if logged in user's role is seller
//else return false

export const isSeller=()=>{
    const userRole=localStorage.getItem("userRole");
    const userIsSeller=userRole==="seller";
    return userIsSeller;
}
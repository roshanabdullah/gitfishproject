
function getCommonOptions(){
    const authToken=JSON.parse(localStorage.getItem('authToken'));

    if(!authToken){
        return  {};
    }
    return {
        method:"GET",
        headers:{
            'Authorization': `token ${authToken}`,
            'Content-Type':'application/json',
            'Accept':'application/json'
        }
    }
    
}
export function saveToken(tokenDetails){
    localStorage.setItem('authToken', JSON.stringify(tokenDetails));
}
export function saveID(tokenDetails){
    localStorage.setItem('User_ID', JSON.stringify(tokenDetails))
}



export default getCommonOptions;
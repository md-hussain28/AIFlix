const Validate=(mail,pass)=>{
    const isEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail);
    const isPass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pass)
    
    if(isEmail&&isPass){return ""; }
    
    if(!isEmail){return "Invalid Email";}
    if(!isPass){return "Password Not Strong"}

}
export default Validate;
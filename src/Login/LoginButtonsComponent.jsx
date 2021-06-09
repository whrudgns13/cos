import { Button } from '@material-ui/core';
import React from 'react'


const LoginButtonsComponent= ()=> {
    return (
        <div className="buttons">
        <Button
       variant="outlined"
       startIcon={<FacebookIcon/>}
       block
     >페이스북으로 로그인하기</Button>  

        <Button 
       variant="outlined"
       startIcon={<MailOutlineIcon />}
       block
     >구글로 로그인하기</Button>   

        <Button 
       variant="outlined"
       startIcon={<AppleIcon />}
       block
     >Apple 계정으로 계속하기</Button>   
        </div>
    );
}

export default LoginButtonsComponent

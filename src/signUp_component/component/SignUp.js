import React, {useState} from 'react';
import AxiosApiService from "../../AxiosApiService";
import DaumPostcode from 'react-daum-postcode';
import '../css/signUp.css';
import { makeStyles } from '@material-ui/core/styles';
import Banner from '../../Maincomponent/Banner';
import Footer from '../../Maincomponent/Footer';
import {Table, TableBody, TableCell, TableRow, Grid, Button, Modal, Backdrop, Fade} from '@material-ui/core';

function SignUp(props) {
    const [user_email,setUser_email] = useState('');            //메일
    const [user_password,setUser_password] = useState('');      //패스워드 
    const [user_passwordChk,setUser_passwordChk] = useState('');//패스워드확인 
    const [passwordError,setPasswordError] = useState(false);   //실시간으로 패스워드 확인
    const [user_name,setUser_name] = useState('');              //이름
    const [user_birthday,setUser_birthday] = useState('');      //생년월일
    const [user_phone,setUser_phone] = useState('');            //핸드폰
    const [postcode,setPostcode] = useState();                  //우편번호
    const [address,setAddress] = useState('');                  //주소
    const [detailAddress,setDetailAddress] = useState('');      //상세주소
    const [isOpenPost, setIsOpenPost] = useState(false);        //api토글
    const [userCheck, setUserCheck] = useState(0); //백엔드에서 중복이메일인지 값을 받아옴
    const [emailCheck, setEmailCheck] = useState(false); //백엔드에서 중복이메일인지 값을 받아옴
    const [openDetailAddress, setOpenDetailAddress] = useState(false);

    const toggleNav = (e) => {
        e.preventDefault();
        //사용자가 클릭시 falue면 true로 true면 falue로 토글
        setIsOpenPost(isOpenPost => !isOpenPost);
        console.log(isOpenPost);
    }

    function checkEmail(e){  //이메일 중복체크
        e.preventDefault();
        AxiosApiService.getUserEmail(user_email)
        .then( res => {
            let userEmail = res.data;//백엔드에서 값을 받아 변수에 저장 
            setUserCheck(userEmail);  //받아온 값을 useState에 저장
            if(userCheck>0){          //이메일이 있으면 0보다 큰 숫자가 들어옴
                alert('이메일이 이미 존재합니다')
                }else{
                alert('사용 가능한 이메일 입니다.')
                setEmailCheck(true);    
            }
        })
        .catch( err =>{
            console.log('getUserEmail() 에러', err);
        });
    }

    //사용자가 submit시 실행되는 이벤트
    function saveUser(e){
        e.preventDefault();
        
        //빈칸확인
        if(user_email===''||emailCheck===false){
            alert('이메일를 체크해주세요');
            return false;
        }
        if(user_password===''){
            alert('비밀번호를 확인해주세요');
            return false;
        }
        if(user_passwordChk===''){
            alert('비밀번호를 확인해주세요');
            return false;
        }
        if(user_name===''){
            alert('이름을 확인해주세요');
            return false;
        }        
        if(user_birthday===''){
            alert('생년월일을 확인해주세요');
            return false;
        }        
        if(user_phone===''){
            alert('핸드폰번호를 확인해주세요');
            return false;
        }        
        if(postcode===''){
            alert('우편번호를 확인해주세요');
            return false;
        }   
        if(address===''){
            alert('주소를 확인해주세요');
            return false;
        }

        //이메일 체크 재검사
        //사용자가 입력한 값들을 객체에 담음
        let user = {
            user_email : user_email,
            user_password: user_password,
            user_name: user_name,
            user_birthday: user_birthday,
            user_phone: user_phone,
            postcode: postcode,
            address: address,
            detailaddress: detailAddress
        }
        console.log(user);
        //객체에 담은 값들을 백엔드로 전송 axios로
        AxiosApiService.insertUser(user)
            .then( res => {
               props.history.push('/'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveUser() 에러', err);
            });
        
        }

    //사용자가 입력한 값들을 실시간으로 저장
    function onEmail (e){
        setUser_email(e.currentTarget.value)
    }
    function onPassword(e){
        setUser_password(e.currentTarget.value)
    }
    function onPasswordChk(e){
        //사용자가 입력한 비밀번호가 비밀번호 확인과 같은지 확인
        setPasswordError(e.target.value !== user_password); 
        setUser_passwordChk(e.currentTarget.value);
    }
    function onName(e){
        setUser_name(e.currentTarget.value)
    }
    function onBirthday(e){
        setUser_birthday(e.currentTarget.value)
    }
    function onPhone(e){
        setUser_phone(e.currentTarget.value)
    }
    function onPostcode(e){
        setPostcode(e.currentTarget.value)
    }
    function onAddress(e){
        setAddress(e.currentTarget.value)
    }

    function onDetailAddress(e){
        setDetailAddress(e.currentTarget.value)
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(5, 5, 5),
          borderRadius:'10px'
        },
      }));

    const classes = useStyles();

    const handleClose = (e) => {
        setIsOpenPost(false);
        setOpenDetailAddress(false);
    };
    
    //카카오 주소 api
    function seachAddress(e){
        const onCompletePost = (data) => {
            let fullAddress = data.address;
            let zonecode = data.zonecode;
            let extraAddress = ''; 
            
            if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            
            setPostcode(zonecode);
            setAddress(fullAddress);
            setIsOpenPost(false);
            console.log(isOpenPost);
            console.log(fullAddress);
        }     
      
        const postCodeStyle =  makeStyles((theme) => ({
            paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            },
            }));
            return (
                <Modal
                className={classes.modal}
                open={isOpenPost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                >
                    <Fade in={isOpenPost}>
                        <div className={classes.paper} style={{width:'640px'}}>
                            {isOpenPost && <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />}
                        </div>
                    </Fade>
                </Modal>
    );
    }

    return (
        <>
        <Banner/>
        <div className="signUp-wapper">
            <div className="signUp-title">
                <span className="sign">Sign Up</span>
                </div>
                
                <form className="signUp-form">
                    <div className="signUp-inputBox">
                    <div className="signUp-inputRow">
                    <label className="signUp-label">Email</label>
                    <button className="signUp-butten" onClick={checkEmail}>이메일 체크</button>
                    </div>
                    <input className="signUp-input" type="email" placeholder="이메일" 
                    id="email" name="user_email" value={user_email} onChange={onEmail} />
                   
                    </div>
    
                    <div className="signUp-inputBox">
                    <label className="signUp-label">Password</label>
                    <input className="signUp-input" type="password" placeholder="비밀번호" 
                    name="user_password" value={user_password} onChange={onPassword} />
                    </div>

                    <div className="signUp-inputBox">
                    <label className="signUp-label">Password</label>
                    <input className="signUp-input" type="password" placeholder="비밀번호 확인" 
                    value={user_passwordChk} onChange={onPasswordChk} />
                     {passwordError && <span style={{color:'red',fontSize:'12px'}}>
                    비밀번호가 일치하지 않습니다.
                    </span>}
                    </div>

                    <div className="signUp-inputBox">
                    <label className="signUp-label">Name</label>
                    <input className="signUp-input" type="text" placeholder="이름"
                    name="user_name" value={user_name} onChange={onName} />
                    </div>

                    <div className="signUp-inputBox">
                    <label className="signUp-label">Birthday</label>
                    <input className="signUp-input" type="text" placeholder="생년월일 (예)950804" 
                    name="user_birthday" value={user_birthday} onChange={onBirthday} />
                    </div>

                    <div className="signUp-inputBox">
                    <label className="signUp-label">Phone</label>
                    <input className="signUp-input" placeholder="핸드폰 번호 -없이 입력해주세요" 
                    name="user_phone" value={user_phone} onChange={onPhone} />
                    </div>
                    
                    <div className="signUp-inputBox">
                    <div className="signUp-inputRow">
                    <label className="signUp-label">Postcode</label>
                    <button className="signUp-butten" onClick={toggleNav} value="우편번호 찾기">우편번호 찾기</button>
                    </div>
                    {isOpenPost && seachAddress()}
                    <input className="signUp-input" type="text" id="postcode" placeholder="우편번호" 
                    name="postcode" value={postcode} onChange={onPostcode}/>
                    </div>
                    
                    <div className="signUp-inputBox">
                    <label className="signUp-label">Address</label>
                    <input className="signUp-input" type="text" id="address" placeholder="주소"
                    name="roadaddress" value={address} onChange={onAddress}/>
                    </div>

                    <div className="signUp-inputBox">
                    <label className="signUp-label">DetailAddress</label>
                    <input className="signUp-input"  type="text" id="detailAddress" placeholder="상세주소"
                    name="detailaddress" value={detailAddress} onChange={onDetailAddress}/>
                    </div>
                    <button className="signUp-save" onClick={saveUser}>Save</button>
                    </form>
                    </div>
            
        <Footer/>
        </>
    )
}

export default SignUp;

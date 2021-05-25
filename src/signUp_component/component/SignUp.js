import React, {useState,useEffect} from 'react';
import AxiosApiService from "../../AxiosApiService";
import DaumPostcode from 'react-daum-postcode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/signUp.css';
import { makeStyles } from '@material-ui/core/styles';

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
    const [isOpenPost, setIsOpenPost] = useState(false); //api토글
    
    
    const [userCheck, setUserCheck] = useState(0);              //백엔드에서 중복이메일인지 값을 받아옴

    const toggleNav = () => {
        //사용자가 클릭시 falue면 true로 true면 falue로 토글
        setIsOpenPost(isOpenPost => !isOpenPost);
        console.log(isOpenPost);
    }

    function checkEmail(){  //이메일 중복체크
        AxiosApiService.getUserEmail(user_email)
        .then( res => {
            let userEmail = res.data; //백엔드에서 값을 받아 변수에 저장
            setUserCheck(userEmail);  //받아온 값을 useState에 저장
            if(userEmail>0){          //이메일이 있으면 0보다 큰 숫자가 들어옴
                alert('이메일이 이미 존재합니다')
                }else{
                alert('사용 가능한 이메일 입니다.')
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
        if(user_email===''){
            alert('이메일을 확인해주세요');
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
        checkEmail()
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

    //카카오 주소 api
    function seachAddress(){
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
        <>
        {isOpenPost ? ( //isOpenPost가 참이면 보여줌
            <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost } />
         ) : null}
         </>
    );
    }

    return (
        <div className="signUp-wapper">
            <div className="signUp-title">
                <span className="sign">Sign Up</span>
                </div>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={5}><Form.Control type="email" placeholder="이메일" 
                    id="email" name="user_email" value={user_email} onChange={onEmail} /></Col>
                    <Button onClick={checkEmail}>이메일 체크</Button>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={5}><Form.Control type="password" placeholder="비밀번호" 
                    name="user_password" value={user_password} onChange={onPassword} /></Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={5}><Form.Control type="password" placeholder="비밀번호 확인" 
                    value={user_passwordChk} onChange={onPasswordChk} /></Col>
                     {passwordError && <span style={{color:'red',fontSize:'15px'}}>
                    비밀번호가 일치하지 않습니다.
                    </span>}
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>Name</Form.Label>
                    <Col sm={5}><Form.Control type="email" placeholder="이름"
                    name="user_name" value={user_name} onChange={onName} /></Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>Birthday</Form.Label>
                    <Col sm={5}><Form.Control type="email" placeholder="생년월일 (예)950804" 
                    name="user_birthday" value={user_birthday} onChange={onBirthday} /></Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>Phone</Form.Label>
                    <Col sm={5}><Form.Control type="email" placeholder="핸드폰 번호 -없이 입력해주세요" 
                    name="user_phone" value={user_phone} onChange={onPhone} /></Col>
                    </Form.Group>
                    
                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>Postcode</Form.Label>
                    <Col sm={5}> <Form.Control type="email" id="postcode" placeholder="우편번호" 
                    name="postcode" value={postcode} onChange={onPostcode}/></Col>

                    <Button onClick={toggleNav} value="우편번호 찾기">우편번호 찾기</Button>
                    {isOpenPost && seachAddress()}<br/>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>Address</Form.Label>
                    <Col sm={5}><Form.Control type="email" id="address" placeholder="주소"
                    name="roadaddress" value={address} onChange={onAddress}/></Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasicEmail">
                    <Form.Label column sm={2}>DetailAddress</Form.Label>
                    <Col sm={5}><Form.Control type="email" id="detailAddress" placeholder="상세주소"
                    name="detailaddress" value={detailAddress} onChange={onDetailAddress}/></Col>
                    </Form.Group>
                    <Button onClick={saveUser}>Save</Button>
                    </Form>
        </div>
    )
}

export default SignUp;

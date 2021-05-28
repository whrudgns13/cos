import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import AxiosApiService from "../../AxiosApiService";
import DaumPostcode from 'react-daum-postcode';
import Form from 'react-bootstrap/Form';

function SignUp(props) {
    const [user_email,setUser_email] = useState('');
    const [user_password,setUser_password] = useState('');
    const [user_name,setUser_name] = useState('');
    const [user_birthday,setUser_birthday] = useState('');
    const [user_phone,setUser_phone] = useState('');
    const [postcode,setPostcode] = useState();
    const [address,setAddress] = useState('');
    const [detailAddress,setDetailAddress] = useState('');
    const [addressIsOpen,setAddressIsOpen] = (useState(false));
    const [isOpenPost, setIsOpenPost] = useState(true);
    const [userCheck, setUserCheck] = useState(0);

    const toggleNav = () => {
        setAddressIsOpen(addressIsOpen => !addressIsOpen)
        //사용자가 클릭시 falue면 true로 true면 falue로
    }

    /*const [userEmail, setUserEmail] = useState({
        user : 0
    });
      
     function UserCheck(){
        AxiosApiService.getUserEmail()
        .then( res => {
            setUserEmail({
                user : res.data
            })
        })
        .catch(err => {
            console.log('UserCheck() Error!', err);
        })
     } 
    */
    function checkEmail(){
        AxiosApiService.getUserEmail(user_email)
        .then( res => {
            let userEmail = res.data;
            setUserCheck(userEmail);
            if(userEmail>0){
            alert('이메일이 이미 존재합니다')
            }else{
            alert('사용 가능한 이메일 입니다.')
            }
        })
        .catch( err =>{
            console.log('getUserEmail() 에러', err);
        });
    }
    function saveUser(){
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
     
        AxiosApiService.insertUser(user)
            .then( res => {
                props.history.push('/'); //입력성공시 이동
            })
            .catch( err =>{
                console.log('saveUser() 에러', err);
            });
        
        }
    function onEmail (e){
        setUser_email(e.currentTarget.value)
    }
    function onPassword(e){
        setUser_password(e.currentTarget.value)
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
            console.log(fullAddress);
        }    
      
   const postCodeStyle = {
      display: 'fixed',
      position: 'relative',
      top: '0%',
      width: '400px',
      height: '400px',
      padding: '7px',
    };
    return (
        <>
        {isOpenPost ? (
            <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost } />
         ) : null}
         </>
    );
    }

    return (
        <div>
                <h2>Sign Up</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="이메일" 
                    name="user_email" value={user_email} onChange={onEmail} />
                    <button onClick={checkEmail}>이메일 체크</button>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호" 
                    name="user_password" value={user_password} onChange={onPassword} /><br/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <input placeholder="이름"
                    name="user_name" value={user_name} onChange={onName} /><br/>
                    
                    <input placeholder="(예)950804" 
                    name="user_birthday" value={user_birthday} onChange={onBirthday} /><br/>

                    <input placeholder="-없이 입력해주세요" 
                    name="user_phone" value={user_phone} onChange={onPhone} /><br/>
                    
                    <input type="text" id="postcode" placeholder="우편번호" 
                    name="postcode" value={postcode} onChange={onPostcode}/><br/>

                    <button onClick={toggleNav} value="우편번호 찾기">우편번호 찾기</button>
                    {addressIsOpen? seachAddress() : null}<br></br>
                    
                    <input type="text" id="address" placeholder="주소"
                    name="roadaddress" value={address} onChange={onAddress}/><br/>

                    <input type="text" id="detailAddress" placeholder="상세주소"
                    name="detailaddress" value={detailAddress} onChange={onDetailAddress}/><br/>

                    <Button variant="contained" color="primary" onClick={saveUser}>Save</Button>
                    </Form.Group>
                    </Form>
        </div>
        
    )
}

export default SignUp;

// import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
// import DaumPostcode from 'react-daum-postcode';
// import { makeStyles } from '@material-ui/core/styles';

// const KakaoAddressApi=()=> {
//     const [postcode,setPostcode] = useState();                  //우편번호
//     const [address,setAddress] = useState('');                  //주소
//     const [openDetailAddress, setOpenDetailAddress] = useState(false);
//     const [isOpenPost, setIsOpenPost] = useState(false);        //api토글
    
//        const useStyles = makeStyles((theme) => ({
//         modal: {
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//         paper: {
//           backgroundColor: theme.palette.background.paper,
//           boxShadow: theme.shadows[5],
//           padding: theme.spacing(5, 5, 5),
//           borderRadius:'10px'
//         },
//       }));

//     const classes = useStyles();

//     const handleClose = (e) => {
//         setIsOpenPost(false);
//         setOpenDetailAddress(false);
//     };
    
//     //카카오 주소 api
//     function seachAddress(e){
//         const onCompletePost = (data) => {
//             let fullAddress = data.address;
//             let zonecode = data.zonecode;
//             let extraAddress = ''; 
            
//             if (data.addressType === 'R') {
//             if (data.bname !== '') {
//                 extraAddress += data.bname;
//             }
//             if (data.buildingName !== '') {
//                 extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
//             }
//             fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
//             }
            
//             setPostcode(zonecode);
//             setAddress(fullAddress);
//             setIsOpenPost(false);
//             console.log(isOpenPost);
//             console.log(fullAddress);
//         }     
      
//         const postCodeStyle =  makeStyles((theme) => ({
//             paper: {
//             position: 'absolute',
//             width: 400,
//             backgroundColor: theme.palette.background.paper,
//             border: '2px solid #000',
//             boxShadow: theme.shadows[5],
//             padding: theme.spacing(2, 4, 3),
//             },
//             }));
//             return (
//                 <Modal
//                 className={classes.modal}
//                 open={isOpenPost}
//                 onClose={handleClose}
//                 closeAfterTransition
//                 BackdropComponent={Backdrop}
//                 BackdropProps={{
//                     timeout: 500,
//                 }}
//                 >
//                     <Fade in={isOpenPost}>
//                         <div className={classes.paper} style={{width:'640px'}}>
//                             {isOpenPost && <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />}
//                         </div>
//                     </Fade>
//                 </Modal>
//     );
//     }
// }

// export default KakaoAddressApi

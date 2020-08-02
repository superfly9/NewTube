import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Subscribe(props) {
    const { userTo,userFrom }=props;
    const [SubscribeNumber,setSubscribeNumber] = useState(0);
    const [Subscribed,setSubscribed] = useState(false);

    useEffect(()=>{
        const body = {
            userTo, //비디오 만든사람
            userFrom  //로그인해 있는 유저
        }
        Axios.post('/api/subscribe/getSubscribeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('구독자 수를 받아오는 데 실패했습니다.')
                }
            })
    },[])
    return (
        <div>
            <Button>{SubscribeNumber} {Subscribed ? '구독 취소' : '구독'}</Button>
        </div>
    )
}

export default Subscribe

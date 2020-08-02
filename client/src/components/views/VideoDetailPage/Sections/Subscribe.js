import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Subscribe(props) {
    const { userTo,userFrom }=props;
    const [SubscribeNumber,setSubscribeNumber] = useState(0);
    const [Subscribed,setSubscribed] = useState(false);

    useEffect(()=>{
        //userTo:비디오 창작자의 mongoDBId userFrom:로그인한 유저의 mongoDBId
        const body = { userTo }
        Axios.post('/api/subscribe/getSubscribeNumber',body)
            .then(response=>{
                if (response.data.success) {
                    const {data :{subscribeNumber}} = response;
                    setSubscribeNumber(subscribeNumber);
                } else {
                    alert('구독자 수를 받아오는 데 실패했습니다.')
                }
            })
        const subscribedCheckObj = {userTo,userFrom};
        Axios.post('/api/subscribe/subscribed',subscribedCheckObj)
            .then(response=>{
                if (response.data.success) {
                    const {data:{subscribed}} = response;
                    console.log('check:',subscribed);
                    setSubscribed(subscribed);
                } else {
                    alert('구독 여부 확인에 실패했습니다.')
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

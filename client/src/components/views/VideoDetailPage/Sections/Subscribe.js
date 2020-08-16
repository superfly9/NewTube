import React,{useEffect,useState, Fragment} from 'react'
import Axios from 'axios';
import './Subscribe.css';

function Subscribe(props) {
    const { userTo,userFrom }=props;
    const [SubscribeNumber,setSubscribeNumber] = useState(0);
    const [Subscribed,setSubscribed] = useState(false);

    useEffect(()=>{
        //userTo:비디오 창작자의 mongoDBId userFrom:로그인한 유저의 mongoDBId
        const body = { userTo }
        Axios.post(`/subscribe/getSubscribeNumber`,body)
            .then(response=>{
                if (response.data.success) {
                    const {data :{subscribeNumber}} = response;
                    setSubscribeNumber(subscribeNumber);
                } else {
                    alert('구독자 수를 받아오는 데 실패했습니다.')
                }
            })
        const subscribedCheckObj = {userTo,userFrom};
        Axios.post(`/subscribe/subscribed`,subscribedCheckObj)
            .then(response=>{
                if (response.data.success) {
                    const {data:{subscribed}} = response;
                    setSubscribed(subscribed);
                } else {
                    alert('구독 여부 확인에 실패했습니다.')
                }
            })
    },[])

    const toggleSubscribe = () =>{
        const body = {userTo,userFrom};
        if (Subscribed) {
        //구독 중 클릭시 구독 해지
            Axios.post(`/subscribe/removeFromSubScribe`,body)
                .then(response=>{
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber-1);
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독해지에 실패했습니다.')
                    }
                })
        } else {
        //구독 중이 아니라면 구독목록에 추가
            Axios.post(`/subscribe/addToSubscribe`,body)
                .then(response=>{
                    if (response.data.success) {
                        setSubscribeNumber(SubscribeNumber+1)
                        setSubscribed(!Subscribed)
                    } else {
                        alert('구독추가에 실패했습니다.')
                    }
                }) 
        }
    }
    return (
        <Fragment>
            <button 
                onClick={toggleSubscribe}
                className='subscribe_btn' 
                style={{backgroundColor:`${Subscribed ? 'gray':'red'}`}}
            >
                {SubscribeNumber}  {Subscribed ? '구독 취소' : '구독'}
            </button>
        </Fragment>
    )
}

export default Subscribe

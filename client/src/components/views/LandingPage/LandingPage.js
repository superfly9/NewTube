import React,{useEffect,useState} from 'react'
import Axios from 'axios'

function LandingPage() {
    const [Videos,setVideos] = useState([]);
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response=>{
                if (response.data.success) {
                    const { data : {videos}} =response;
                    Videos(videos)
                }
            })
    }, [])
    return (
        <div>

        </div>
    )
}

export default LandingPage

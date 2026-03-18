import {userState} from "react"

const Timer = ()=>{
    const [seconds,setSeconds] = userState<number>(0);

    return(
        <div>
            <h2>타이머:{secodns}초</h2>
            <button onClick={()=>{
                setInterval(() => {
                    setSecondes((prev)=>{
                        prev+1
                    })
                }, 1000);
            }}></button>
        </div>
    )
}

export default Timer;
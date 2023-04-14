import React, {useState, useEffect} from "react";

const RecommendModal = () =>{
    const [recommend, setRecommend] = useState(true)
    const [recommendEmail, setRecommendEmail] = useState('')
    const [recommendError, setRecommendError] = useState(false)
    const [close, setClose] = useState(false)
    const sendHandler = (e) =>{
        e.preventDefault();
        //console.log("send")
        let isValid = true;
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recommendEmail);
        if(recommendEmail.length === 0){
            setRecommendError('Email is Required')
            isValid = false;
        }
        else if (!emailReg) {
            setRecommendError('Enter Valid Email')
            isValid = false;
        }
        else {
            setRecommendError('Email has been send successfully...')
            setRecommend(false)
        }
        return isValid;
    }
    const closeHandler = (e) =>{
        e.preventDefault()
        console.log("close")
        setRecommend(!recommend)
        setRecommendError(false)
        // setTimeout(()=>setRecommendError('Email has been send successfully...'), 2000)
    }  
    
    // useEffect(()=>{
       
    //     setTimeout(()=>setRecommendError('Email has been send successfully...'), 2000)
        
    // }, [recommend])
    return (
        
        <div className="recommended-modal">
            {recommend && <form className="recommended-form">
                <input 
                className="recommended-input-field"
                type="email" 
                placeholder="Enter Email Id"
                value={recommendEmail} 
                onChange={(e)=>setRecommendEmail(e.target.value)}/>
                <button 
                onClick={sendHandler}
                className="send-button"
                >Send</button>
                <button 
                onClick={closeHandler} 
                className="close-button">x</button>
                </form>}
                {recommendError && <p style={{color:'red',marginTop: "-23px", textAlign: "center"}}>{recommendError}</p>}
        </div>
    )
};

export default RecommendModal;
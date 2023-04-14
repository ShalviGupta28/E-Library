import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nextId from "react-id-generator";
import DatePicker from 'react-date-picker';
import Pdf from './Pdf';
import { jsPDF } from "jspdf";
import ReactDOM from "react-dom";
import QuizPage from "./QuizPage";
// import Pdf from "react-to-pdf";

const SubscriptionForm = ({title}) => {
  // const ref = React.createRef();
  const navigate = useNavigate();
  
  const [subscriptionDetail, setSubscriptionDetail] = useState({
    globalId: "",
    joiningDate:"",
    name: "",
    empId: "",
    grade: "",
    supervisior: "",
  });
  const [subscriptionError, setSubscriptionError] = useState({
    globalId: "",
    joiningDate:"",
    name: "",
    empId: "",
    grade: "",
    supervisior: "",
  });
  const [disabledButton, setDisabledButton] = useState(false);
  const [pdf, setPdf] = useState(false);
  const [displayError, setDisplayError] =  useState(true);
  


  const subscriptionValidateform = () => {
    let isValid = true;
    let error = subscriptionError;
    
    //globalId
    const glodalExp = /^[A-z]{10}$/.test(subscriptionDetail.globalId);

    if (!subscriptionDetail.globalId.trim()) {
      error.globalId = "Enter Global Id";
      isValid = false;
    } else if (!glodalExp) {
      error.globalId = "Global Id must be 10 alphabetic characters";
      isValid = false;
    } else {
      error.globalId = ""
    }

    //joiningDate
    const joiningdateExp = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/.test(subscriptionDetail.joiningDate);

    if (!subscriptionDetail.joiningDate.trim()) {
      error.joiningDate = "Enter Joining Date";
      isValid = false;
    } else if (!joiningdateExp) {
      error.joiningDate = "Enter Valid Joining Date";
      isValid = false;
    } else {
      error.joiningDate = ""
    }

    //name
    const nameExp = /(?=.*?[A-z])/.test(subscriptionDetail.name);

    if (!subscriptionDetail.name.trim()) {
      error.name = "Enter Name";
      isValid = false;
    } else if (!nameExp) {
      error.name = "Name must be alphabets only";
      isValid = false;
    } else {
      error.name = ""
    }

    //emplId
    const empidExp = /^[0-9]{8}$/.test(subscriptionDetail.empId);

    if (!subscriptionDetail.empId.trim()) {
      error.empId = "Enter Employ Id";
      isValid = false;
    } else if (!empidExp) {
      error.empId = "Emp Id must be 8 digit numbers";
      isValid = false;
    } else {
      error.empId = ""
    }

    //Grade
    const gradeExp = /^[a-zA-Z]{1}[0-9]{1}$/.test(subscriptionDetail.grade);

    if (!subscriptionDetail.grade.trim()) {
      error.grade = "Enter Grade";
      isValid = false;
    } else if (!gradeExp) {
      error.grade = "Grade must be 1 alphabet and 1 number";
      isValid = false;
    } else {
      error.grade = ""
    }

    //supervisior
    const supervisiorExp = /(?=.*?[A-z])/.test(subscriptionDetail.supervisior);

    if (!subscriptionDetail.supervisior.trim()) {
      error.supervisior = "Enter Supervisior";
      isValid = false;
    } else if (!supervisiorExp) {
      error.supervisior = "Supervisior must be alphabets only";
      isValid = false;
    } else {
      error.supervisior = ""
    }

    return (
      setSubscriptionError(error),
      isValid
    );
  };

  const downloadHandler = (e) => {
    e.preventDefault();
    console.log(subscriptionDetail)
    setDisplayError(true)
    if(disabledButton === true) {
      setPdf(true)
      // navigate('/quiz')
      // window.open("http://localhost:3000/pdf", Pdf)
    //   const link = document.createElement("a");
    // //link.download = `download.txt`;
    // link.href = "./Pdf.jsx";
    // link.target = "_blank";
    // link.click();
    }
    
      
   
  };

  // useEffect(()=>{
  //   if (subscriptionValidateform()) {
  //     setDisabledButton(true)
  //     console.log("form submitted");
  //     setSubscriptionDetail({ ...subscriptionDetail });
  //     console.log(subscriptionDetail);
  //   }
  // },[])
  
  useEffect(() => {
    subscriptionValidateform()
   
    if(subscriptionDetail !== null) {
    setDisabledButton(Object.values(subscriptionDetail).every((value) => value !== ""))
    console.log(subscriptionDetail);
    }
  }, [subscriptionDetail]);
  return (
    <div className="subscribe-form">
      <h4 className="subscribe-form-title">{title} (Subscription Form)</h4>
      <form onClick={downloadHandler}>
        <div>
          <div className="global-id-joining-date">
          <label>Global Id</label>
          <input
            type="text"
            id="globalId"
            placeholder="Enter Global Id"
            value={subscriptionDetail.globalId}
            required
            className="subscription-input-field"
            style={{marginLeft: "29px"}}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                globalId: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.globalId && (
            <div className="subscription-error">{subscriptionError.globalId}</div>
          )}
          <br />
          
          <label>Joining Date</label>
          <input
            type="text"
            id="joiningDate"
            placeholder="DD/MM/YYYY"
            value={subscriptionDetail.joiningDate}
            required
            className="subscription-input-field"
            style={{marginLeft: "6px"}}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                joiningDate: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.joiningDate && (
            <div className="subscription-error">{subscriptionError.joiningDate}</div>
          )}</div>
          <br />
          <div className="name-emp">
          <label>Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Name"
            required
            className="subscription-input-field"
            style={{marginLeft: "34px", backgroundColor: "#c2bdbd",opacity: "0.6"}}
            value={subscriptionDetail.name}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                name: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.name && 
            <div className="subscription-error">{subscriptionError.name}</div>}
          <br />
          <label>Emp Id</label>
          <input
            type="number"
            id="empId"
            placeholder="Enter Emp Id"
            required
            className="subscription-input-field"
            style={{marginLeft: "31px", backgroundColor: "#c2bdbd",opacity: "0.6"}}
            value={subscriptionDetail.empId}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                empId: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.empId && 
          <div className="subscription-error">{subscriptionError.empId}</div>}</div>
          <br />
          <div className="grade-supervisior">
          <label>Grade</label>
          <input
            type="text"
            id="grade"
            placeholder="Enter Grade"
            required
            className="subscription-input-field"
            style={{marginLeft: "47px", backgroundColor: "#c2bdbd",opacity: "0.6"}}
            value={subscriptionDetail.grade}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                grade: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.grade && 
            <div className="subscription-error">{subscriptionError.grade}</div>}
          <br />
          <label>Supervisior</label>
          <input
            type="text"
            id="supervisior"
            placeholder="Enter Supervisior"
            required
            className="subscription-input-field"
            style={{marginLeft: "17px", backgroundColor: "#c2bdbd",opacity: "0.6"}}
            value={subscriptionDetail.supervisior}
            onChange={(e) => {
              setSubscriptionDetail({
                ...subscriptionDetail,
                supervisior: e.target.value,
              });
              console.log(subscriptionDetail);
            }}
          />
          {subscriptionError.supervisior && (
            <div className="subscription-error">{subscriptionError.supervisior}</div>
          )}</div>
          <br />
        </div>
        {displayError && <p className="subscription-input-error">Please Fill All the Input Fields....</p>}
        {/* using react */}
        {/* <Pdf targetRef={ref} filename="download.pdf">
        {({ toPdf }) => <button  onClick={toPdf}>Save & Download</button>}
        </Pdf> */}
        <button disabled={!disabledButton} className={!disabledButton ? "subscribe-save-download" : "subscribe-save-download-enabled"}>Save & Download</button>
       
      
        {pdf && <>
        <Pdf/>
        {/* <QuizPage ebookName={title} date={currentdate} id={uniqueId}/> */}
        {/* <h2>Date: {currentdate}, Subscription Id: {uniqueId} </h2> */}
        </>}

      </form>
    </div>
  );
};

export default SubscriptionForm;

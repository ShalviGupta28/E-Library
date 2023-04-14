import React, { useEffect, useState } from "react";
import MainPage from "./MainPage";


const Dashboard = () =>{
    const [list, setList] = useState([]);
    

    useEffect(() => {
        fetch("https://openlibrary.org/search/authors.json?q=twain")
          .then((res) => res.json())
          .then((json) => {
            setList(json.docs);
            console.log("json", json.docs);
          });
      }, []);
     
      
    return (
        <div>
            <MainPage/>
            <div className="dashboard-content">
                <h4 className="dashboard-active-subscription-list">Active Subscriptions List</h4>
                {list.length > 0 &&
                <ul>
                {list?.map((user, index) => (
                    <div key={index}>
                      {/* {console.log("user", user)}  */}
                      <h5>{user.top_work}</h5>
                      <p>Author: {user.name}</p>
                      <button 
                      
                      onClick={()=>setList(list.includes(user.key) 
                        ?  list.filter(vId => vId !== user.key)
                        : [...list, user.key])}
                         className="dashboard-read-more-button">
                          {list.includes(user.key)  ? "Read Less" : "Read More"}
                          {/* {console.log("userrrrr.name", user.key)} */}
                         </button>

                         {list.includes(user.key) && 
                      <div>
                        <table className="dashboard-table"> 
                        <thead>
                        <tr>                          
                        <th>Category</th>
                        <th>Key</th>
                        <th>Version</th>
                        <th>Work Count</th>
                         </tr>
                         </thead>
                        <tbody>
                        <tr>
                        <td>{user.top_subjects}</td>
                        <td>{user.key}</td>
                        <td>{user._version_}</td>
                        <td>{user.work_count}</td>
                        </tr>
                        </tbody>
                        </table>
                      </div>
                      }                
                    </div>
                  ))}  
                </ul>
                }  
            </div>
        </div>
    )
}

export default Dashboard;
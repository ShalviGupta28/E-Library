import React, {useState, useRef} from "react";

const Filters = (
    {searchedName, 
    searchedCategory, 
    searchedAuthor,
    error,
    setError
}) =>{
    const nameRef = useRef();
    const categoryRef = useRef();
    const authorRef = useRef();
    const [validationError, setValidationError] = useState(false)
    const filterHandler = (e)=>{
        e.preventDefault();
        setValidationError(false)
        console.log("filters")
        const searchName = nameRef.current.value;
        console.log(searchName)
        searchedName(searchName)
        const searchCategory = categoryRef.current.value;
        console.log(searchCategory)
        searchedCategory(searchCategory)
        const searchAuthor = authorRef.current.value;
        console.log(searchAuthor)
        searchedAuthor(searchAuthor)
        if(searchName === "" && searchCategory === "" && searchAuthor === ""){
            setValidationError(true)
        }
    }
    
    return (
        <form onSubmit={filterHandler} className="filter-input-field">
            <input 
            type="text" 
            placeholder="Search by name"
            ref = {nameRef}
            className="searchbyname"
            />
   
            <input
            type="text"
            placeholder="Search by Author"
            ref={authorRef}
            className="searchbyauthor"
            />
        
            <input
            type="text"
            placeholder="Search by Category"
            ref={categoryRef}
            className="searchbycategory"
            />

        {validationError ? <p className="search">Search by name or author or category</p> : ''}
       
            <button className="filter-button">Filter</button>
        </form>
    )
};

export default Filters;
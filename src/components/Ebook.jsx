import React, {useState, useEffect} from "react";
import Header from "./Header";
import MainPage from "./MainPage";
import RecommendModal from "./RecommendModal";
import {useParams} from "react-router-dom";
import SubscriptionForm from "./SubscriptionForm";

const Ebook = ({dashboardButton}) => {
  const [recommendedModal, setRecommendedModal] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [readModal, setReadModal] = useState(true)
  const [products, setProducts] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);
  const params = useParams();
  const [ebook, setEbook] = useState(true);
  // const ebook = true;
  
  const recommendHandler = ()=>{
    console.log("recommend")
    setRecommendedModal(!recommendedModal)
  }
  const readmoreHandler = () =>{
    setReadMore(true)
    setReadModal(false)
  }
  const subscribeHandler = () =>{
    setSubscribe(!subscribe)
  }
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((res) => res.json())
      .then((json) =>
        setProducts(json.items)
      );
  }, []);

  useEffect(() => {
    if (params.title) {
      products.forEach((product) => {
        if (product.volumeInfo.title === params.title) 
        {
        setDetailProduct(product);
        }
      });
    }
  }, [params.title, products]);
  if (detailProduct.length === 0) return null;
  return (
    <div>
      <MainPage dashboardButton={dashboardButton} ebook={ebook}/>
      <div className="dashboard-top-panel">
        <h4>{detailProduct.volumeInfo.title}
        {dashboardButton == "Preview" ? <p>(Preview)</p>: <p>(Subscription)</p>}</h4>
        <div className="dashboard-top-panel-body">
        <div className="dashboard-top-left-panel">
        <p>Author: {detailProduct.volumeInfo.authors}</p>
        <p>Category: {detailProduct.volumeInfo.categories}</p>
        <p>Publisher: {detailProduct.volumeInfo.publisher}</p>
        <p>Date Published: {detailProduct.volumeInfo.publishedDate}</p>
        <p>Page Count: {detailProduct.volumeInfo.pageCount}</p>
        </div>
        <div className="dashboard-top-right-panel">
          <p>{detailProduct.volumeInfo.description}</p>
          {dashboardButton == "Preview" ? 
          <>
          {readModal && <button className="dashboard-top-left-button" onClick={readmoreHandler}>Read More</button>}
          <button className="dashboard-top-right-button" onClick={recommendHandler}>Recommend to a Colleague</button>
          {recommendedModal && <RecommendModal />}
          </> : <button onClick={subscribeHandler} className="dashboard-subscribe">Subscribe</button>}
          {subscribe && <SubscriptionForm dashboardButton={dashboardButton} title = {detailProduct.volumeInfo.title}/>}
        </div>
        </div>
      </div>

      {readMore && <div className="dashboard-top-panel content">
        <h4>{detailProduct.volumeInfo.title}</h4>
        <div className="dashboard-top-panel-body">
        <p>{detailProduct.searchInfo.textSnippet}</p>
        <p>Version: {detailProduct.volumeInfo.contentVersion}</p>
        <img src={detailProduct.volumeInfo.imageLinks.smallThumbnail} width="50" height="50"/>
        </div>
      </div>}
      
    </div>
  );
};

export default Ebook;

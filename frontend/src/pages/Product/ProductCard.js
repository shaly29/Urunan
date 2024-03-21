
import React from 'react';
import {Link} from 'react-router-dom';

export default function ProductCard({product}) {
    return <div className="col-sm-12 col-md-6 col-lg-4 my-3 details">
    <div className="dish-box" style={{ height: '25rem' }}>
        <img
        className="card-img-top mx-auto"
        src={product.image ? product.image.url:'pls'}

        />
        <div className="card-body d-flex flex-column">
        <h5 className="card-title">
        <Link to={"/viewdetails/"+product._id}        style={{height:"35px"}} >{product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
            <div className="rating-outer">
            <div className="rating-inner" style={{width : `${product.ratings/5 * 100}%`}} ></div>
            </div>
        </div>
        <p className="card-text">Rs. {product.price}</p>
        <Link to={"/viewdetails/"+product._id}id="view_btn" className="sec-btn" >View Details</Link>
        </div>
    </div>
</div>
}
// <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
// <div className="dish-box text-center">
//     <div className="dist-img">
//         <img src="assets/images/dish/1.png" alt=""/>
//     </div>
//     <div className="dish-rating">
//         5
//         <i className="uil uil-star"></i>
//     </div>
//     <div className="dish-title">
//         <h3 className="h3-title">Fresh Chicken Veggies</h3>
//         <p>120 calories</p>
//     </div>
   
//     <div className="dist-bottom-row">
//         <ul>
//             <li>
//                 <b>Rs. 499</b>
//             </li>
           

          
//         </ul>
//     </div>
//     <a href="partsform" className="sec-btn"> Parts Repair</a>  
// </div>
// </div>

import React from 'react'
import profilePng from "../../images/Profile.png";
import ReactStars from "react-rating-stars-component";


export const ReviewCard = ({review}) => {
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <>
     <div className="reviewCard">
     <img src={profilePng} alt="User" />
     <p>{review.name}</p>
     <ReactStars {...options} />
     <span className="reviewCardComment">{review.comment}</span>
     </div>
    </>
  )
}

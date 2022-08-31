import React from "react"
import Link from "next/link"
import NextImage from "./image"

import {Image,createStyles} from '@mantine/core'
import food from "../public/images/food.jpg"; // Tell webpack this JS file uses this image
import heartOutline from "../public/images/heart-outline.png"; // Tell webpack this JS file uses this image
import heartFill from "../public/images/heart-fill.png"; // Tell webpack this JS file uses this image
import Articles from "./articles";

const useStyles = createStyles((theme) => ({
  
  smallCard: {
    
  }

}));

const Card = ({ article }) => {
  const { classes } = useStyles();


  // console.log(article.attributes.image.data.attributes.name)
  return (
    <>
   
    <Link href={`/article/${article.attributes.slug}`}>
     <div className="card">
     <div className="card-header">
       <div className="profile">
         <span className="letter">{article.attributes.title [0]}</span>
       </div>
       <div className="card-title-group">
         <h5 className="card-title">  {article.attributes.title}</h5>
         <div className="card-date"> {article.attributes.author.data.attributes.name}</div>
       </div>
     </div>
     <img style={{height: "50px !important",
    minWidth: "250px !important",
    maxHeight:"50px!important",}} src={article.attributes.image.data.attributes.name} />
     {/* <div className="card-text">{props.description}</div> */}
     <div className="card-like-bar">
       {/* {props.liked ? ( */}
         <img className="card-like-icon" src="/images/heart-fill.png" alt="Logo" />
      {/* //  ) : (
      //    <img className="card-like-icon" src={heartOutline} alt="Logo" />
      //  )} */}
       <div className="like-text">
         {/* <b>{props.likeCount}</b> kişi bu tarifi beğendi. */}
       </div>
     </div>
   </div>
   </Link>
   </>
  )
}

export default Card

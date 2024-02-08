import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import { getThumbNail } from "../services/PostDataService";
import ReactTimeAgo from "react-time-ago";

const PostItem = ({ post }) => {

  const shortDescription =
    post.content.length > 130
      ? post.content.substr(0, 130)  + "..."
      : post.content;
  const shortTitle =
    post.title.length > 30 ? post.title.substr(0, 30) + "..." : post.title;

  return (
    <article className="post">
      <Link to={`/posts/${post.postId}`}>
        <div className="post_thumbnail">
          <img src={process.env.REACT_APP_API_SERVER_URL+`/api/post/file/${post?.imageName}`} alt={post?.title} title={post?.title} />
        </div>
      </Link>
      <div className="post_content">
        <Link to={`/posts/${post.postId}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }}></p>
        <div className="post_footer">
          <PostAuthor
            author={post?.user} 
            postCreateDate={post?.createDate}
          />
          <Link
            to={`/posts/categories/${post.category.categoryId}`}
            className="btn category">
            {post.category.categoryTitle}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;

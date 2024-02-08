import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({author, postCreateDate}) => {
  const FName = author?.name?.length > 6 ? author?.name.substr(0, 6) + '' : author?.name;
  
  const postDate = postCreateDate;
  /* Date Time Formate */
  const formatDate = (dateArray)=> {
    // Create a JavaScript Date object from the date and time array
    const [year, month, day, hours, minutes, seconds] = dateArray;
    const date = new Date(year, month -1, day, hours, minutes, seconds);
  
    // Return the formatted date using react-time-ago
    return <ReactTimeAgo date={date} />;
  }

  return (
    <>
        <Link to={`/post/user/${author?.userid}`} className='post_author'>
            <div className='post_author-avater'>
                <img src={process.env.REACT_APP_API_SERVER_URL+`/api/post/file/${author?.image_Name}`} title={author.name} alt={author.name} />
            </div>
            <div className='post_author-details'>
                <h5>Post By: {FName}</h5>
                <small>{formatDate(postDate)}</small>
            </div>
        </Link>
    </>
  );
}

export default PostAuthor;

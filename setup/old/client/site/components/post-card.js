import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostCard = ({ post }) => (
  <div className='post-card'>
    <div className='post-card-body'>
      <Link prefetch href={{ pathname: '/post', query: { id: post._id } }}>
        <a>
          <h3>{post.title}</h3>
        </a>
      </Link>
      <Link prefetch href={{ pathname: '/post', query: { id: post._id } }}>
        <a>
          <h4>{post.description}</h4>
        </a>
      </Link>
    </div>
    <div className='post-card-footer'>
      {post.author && post.author.name &&
        <Link prefetch href={{ pathname: '/profile', query: { id: post.author._id } }}>
          <a>
            <span className='post-card-footer-author'>{post.author.name}</span>
          </a>
        </Link>
      }
      <span className='post-card-footer-date'>{post.openingDate}</span>
    </div>
    <style jsx>{`
      .post-card {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: space-between;
        margin: 16px 0;
        padding: 16px;
        height: 258px;
        width: 288px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      }
      .post-card:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
      }
      .post-card-body {
        width: 100%;
      }
      .post-card-body a {
        color: var(--black);
        text-decoration: none;
      }
      .post-card-body h3 {
        font-size: 20px;
        font-weight: 600;
        line-height: 2.4rem;
      }
      .post-card-body h4 {
        font-size: 16px;
        color: rgba(0,0,0,.6);
        max-height: 60px;
        overflow: ellipsis;
      }
      .post-card-footer {
        display: flex;
        flex-wrap: wrap;
      }
      .post-card-footer {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        font-size: 14px;
      }
    `}</style>
  </div>
)

PostCard.propTypes = {
  post: PropTypes.object
}

export default PostCard

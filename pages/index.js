import Head from 'next/head'
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {useState} from "react"


export default function Home({posts}) {
  const [flag, setFlag] = useState(true);

  const handleClick = () => {
    if (flag === true) {
      setFlag(false)
    } else {
      setFlag(true)
    }
  };
  
  const renderPosts = (posts) => {
    return posts.slice(0,4).map(post =>
      <div key={post.id} className="feed-child">
          <div className="image">
          <Image
          src={post.volumeInfo.imageLinks.thumbnail}
          alt=""
          width={120}
          height={160}
          />
          </div>
          <div className="data">
            <h5>Title: {post.volumeInfo.title}</h5>
            <h6>Authors: {post.volumeInfo.authors}</h6>
            <h6>Page Count: {post.volumeInfo.pageCount}</h6>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut purus varius neque lacinia mollis.</p>
          </div>
      </div>
    )
  }

  return (
    <div className="mainParent">
      <div className="parentTitle">
            <h1>The Book Store</h1>
        </div>
        <div className="flex-center">
      { flag &&
        <MenuOutlinedIcon className="menu" onClick={handleClick}/>
        }
        { !flag &&
        <MenuOpenOutlinedIcon className="menu" onClick={handleClick}/>
        }
    </div>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut purus varius neque lacinia mollis. Phasellus consequat et lacus ac auctor. Ut eget tincidunt massa. Sed at vulputate dui. Nullam metus urna, volutpat nec felis nec, congue varius magna.
      </p>
      <div className="feature-parent">
        <h1>Featured</h1>
        <div className="feature-card">
          <Image
          src={posts[1].volumeInfo.imageLinks.thumbnail}
          alt=""
          width={128}
          height={160}
          />
          <div className="bookInfo">
            <h5>Title: {posts[1].volumeInfo.title}</h5>
            <h6>Authors: {posts[1].volumeInfo.authors}</h6>
            <h6>Page Count: {posts[1].volumeInfo.pageCount}</h6>
          </div>
          
        </div>
        <div className="feature-card">
        <Image
          src={posts[2].volumeInfo.imageLinks.thumbnail}
          alt=""
          width={128}
          height={160}
          />
          <div className="bookInfo">
            <h5>Title: {posts[2].volumeInfo.title}</h5>
            <h6>Authors: {posts[2].volumeInfo.authors}</h6>
            <h6>Page Count: {posts[2].volumeInfo.pageCount}</h6>
          </div>
        </div>
      
      </div>
      <div className="feed-parent">
        { posts &&
          renderPosts(posts)
        }
      </div>
      <footer>
        <TwitterIcon className="footer-child"/>
        <FacebookIcon className="footer-child"/>
        <InstagramIcon className="footer-child"/>
      </footer>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://www.googleapis.com/books/v1/volumes?q=HTML5')
  const json = await res.json()
  return { posts: json.items }
}


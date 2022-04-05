import Head from 'next/head'
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {useState, useEffect} from "react"
import Cookie from "js-cookie"

const logo = "/bookstore-logo.png"

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
            <div className="desktop-header">
              <Image
                src={logo}
                alt=""
                width={180}
                height={120}
                />
            </div>
            <div className="header-title">
              <h1>The Book Store</h1>
            </div>
            <div className="desktop-header-icon">
              <TwitterIcon className="header-child"/>
              <FacebookIcon className="header-child"/>
              <InstagramIcon className="header-child"/>
            </div>
        </div>
        <div className="flex-center">
      { flag &&
        <MenuOutlinedIcon className="menu" onClick={handleClick}/>
        }
        { !flag &&
        <MenuOpenOutlinedIcon className="menu" onClick={handleClick}/>
        }
    </div>
    <div className="desktop-nav-parent">
      <div className="desktop-nav">
        <div className="nav-child">Home</div>
        <div className="nav-child">Books</div>
        <div className="nav-child">Magazines</div>
        <div className="nav-child">E-books</div>
        <div className="nav-child">Account</div>
      </div>
    </div>
    
      <p className="para">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut purus varius neque lacinia mollis. Phasellus consequat et lacus ac auctor. Ut eget tincidunt massa. Sed at vulputate dui. Nullam metus urna, volutpat nec felis nec, congue varius magna.
      </p>
      <main>
      <div className="feature-parent">
        <h1>Featured</h1>
        <div className="feature-card">
          <Image
          src={posts[8].volumeInfo.imageLinks.thumbnail}
          alt=""
          width={128}
          height={160}
          />
          <div className="bookInfo">
            <h5>Title: {posts[8].volumeInfo.title}</h5>
            <h6>Authors: {posts[8].volumeInfo.authors}</h6>
            <h6>Page Count: {posts[8].volumeInfo.pageCount}</h6>
          </div>
          
        </div>
        <div className="feature-card">
        <Image
          src={posts[9].volumeInfo.imageLinks.thumbnail}
          alt=""
          width={128}
          height={160}
          />
          <div className="bookInfo">
            <h5>Title: {posts[9].volumeInfo.title}</h5>
            <h6>Authors: {posts[9].volumeInfo.authors}</h6>
            <h6>Page Count: {posts[9].volumeInfo.pageCount}</h6>
          </div>
        </div>
      
      </div>
      <div className="feed-parent">
        { posts &&
          renderPosts(posts)
        }
      </div>
      </main>
      
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


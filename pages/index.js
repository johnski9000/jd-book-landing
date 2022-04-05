import Head from 'next/head'
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import {useState, useEffect} from "react"
import Cookie from "js-cookie"
import useWindowDimensions from './../actions/useWindowDimensions';


const logo = "/bookstore-logo.png"

export default function Home({posts}) {
  const {windowDimensions} = useWindowDimensions()
  const width = windowDimensions.width;
  const [flag, setFlag] = useState(true);
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);

  const ToggleClass = () => {
    setActive(!isActive); 
   };

   const ToggleClass1 = () => {
    setActive1(!isActive1); 
   };


  const handleClick = () => {
    if (flag === true) {
      setFlag(false)
    } else {
      setFlag(true)
    }
  };
  
  const renderPostsMobile = (posts) => {

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
            <p>{post.volumeInfo.description.substring(0, 140)}</p>
          </div>
      </div>
    )
  }
  const renderPostsDesktop = (posts) => {

    return posts.slice(0,8).map(post =>
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
            <p>{post.volumeInfo.description.substring(0, 140)}</p>
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
        <div className={isActive ? "feature-card is-active" : "feature-card"} onClick={ToggleClass}>
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
            <p>{posts[8].volumeInfo.description.substring(0, 135)}</p>
          </div>
          
        </div>
        <div className={isActive1 ? "feature-card is-active" : "feature-card"} onClick={ToggleClass1}>
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
            <p>{posts[9].volumeInfo.description.substring(0, 126)}</p>
          </div>
        </div>
      
      </div>
      <div className="feed-parent">
        { width >= 768 &&
          renderPostsDesktop(posts)
        }
        { width < 768 &&
          renderPostsMobile(posts)
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


import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BlogDetails.css";
import Header from "../../components/Header";
import Subscribe from "../../components/Subscribe";
import Featured from "../../components/Featured";
import MidFooter from "../../components/MidFooter";
import bdetail from "../../images/bt1.jpg";
import cmt from "../../images/comment1.png";
import author from "../../images/author-1.png";
import sideimage from "../../images/side-image.jpg";
import logo from "../../images/favIcon.png";
import { Link, useParams } from "react-router-dom";
import bimage from "../../images/s1.jpg";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import MobileSidebar from "../../components/MobileSidebar";
import axios from "axios";
import { storeBlog } from "../../state/action";
import SignContext from "../../contextAPI/Context/SignContext";

const BlogDetails = () => {
  const id = useParams("id");
  const { getCategories, GetHotDeals } = useContext(SignContext);
  const dispatch = useDispatch();
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [selectedBlogPost, setSelectedBlogPost] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetHotDeals();
    console.log(res);

    if (res.success) {
      setContentData(res.content);
    }
  };

  const arrayOfBlog = useSelector((state) => state.blog);

  const Getcategories = async () => {
    const res = await getCategories();
    // console.log(res);
    if (res !== undefined) {
      const transformedData = res.map((category, index) => ({
        ...category,
        id: index + 1,
      }));
      setCategoryData(transformedData);
    }
  };

  const getAllBlogs = () => {
    const url = `${process.env.REACT_APP_BASE_URL}`;
    if (arrayOfBlog) {
      axios
        .post(`${url}/blog/get-blog`)
        .then((res) => {
          const responseData = res.data.data;
          if (Array.isArray(responseData) && responseData.length === 0) {
            console.log("Received an empty array from the server.");
          } else {
            dispatch(storeBlog(responseData));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(id);
    if (arrayOfBlog.length === 0) {
      getAllBlogs();
    }
    const selectedBlog = arrayOfBlog.filter((obj) => obj._id === id.id);
    setSelectedBlogPost(selectedBlog[0]);
    console.log(selectedBlog[0]);
    Getcategories();
    getaboutUsContent();
  }, [id]);

  return (
    <div>
      <Header />
      <MobileSidebar />
      <div class="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home
            </Link>
            <AiOutlineRight className="rightIcon" /> <span /> Blogs <span />{" "}
            <AiOutlineRight className="rightIcon" />
            <span>Blog Details</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ transform: "none" }}>
        <div className="row" style={{ transform: "none" }}>
          <div
            className="col-xl-11 col-lg-12 m-auto"
            style={{ transform: "none" }}
          >
            <div className="row" style={{ transform: "none" }}>
              <div className="col-lg-9">
                <div className="single-page pt-50 pr-30">
                  <div className="single-header style-2">
                    <div className="row">
                      <div className="col-xl-10 col-lg-12 m-auto">
                        <h2 className="mb-10 text-start ">
                          {selectedBlogPost.blogTitle}
                        </h2>
                        <div className="single-header-meta">
                          <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                            {/* <Link className="author-avatar" to="#">
                              <img className="img-circle"
                              src={`${url}/blog-images/${selectedBlogPost.imagePath}`}
                                alt />
                            </Link> */}
                            <span className="post-by">
                              By <Link to="#">{selectedBlogPost.blogFeed}</Link>
                            </span>
                            <span className="post-on has-dot">
                              {" "}
                              {new Date(
                                selectedBlogPost.date
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            {/* <span className="time-reading has-dot">
                              8 mins read
                            </span> */}
                          </div>
                          {/* <div className="social-icons single-share">
                            <ul className="text-grey-5 d-flex">
                              <li className="mx-2">
                                <Link to="#">
                                  <i class="bi bi-bookmark"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="#">
                                  <i class="bi bi-heart"></i>
                                </Link>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <figure className="single-thumbnail">
                    <img
                      src={`${url}/blog-images/${selectedBlogPost.imagePath}`}
                      alt=""
                    />
                  </figure>
                  <div className="single-content">
                    <div className="row">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedBlogPost.blog,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 primary-sidebar sticky-sidebar pt-50">
                <div className="theiaStickySidebar">
                  <div className="widget-area">
                    <div className="sidebar-widget widget-category-2 mb-50">
                      <h5 className="section-title style-1 mb-30">Category</h5>
                      <ul>
                        {CategoryData.map((category, index) => (
                          <li key={index}>
                            <Link to={`/product-list/${category._id}`}>
                              <img src={logo} alt />
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="banner-img wow fadeIn mb-0 animated d-lg-block d-none animated"
                      style={{ visibility: "visible", minHeight: "300px" }}
                    >
                      <img src={sideimage} alt />
                      <div className="baner-text">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ContentData ? ContentData.content : null,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-4">
                  <img src={bimage} />
                </div>
                <div className="col-md-8">
                  <p>
                  In the mystical world of "The Chronicles of Lord
                          Lalji," embark on a journey through time and wisdom as
                          we delve into the enigmatic life and teachings of the
                          revered Lord Lalji. Unveil the secrets of his ancient
                          scrolls, whispered legends, and timeless philosophies
                          that have shaped the destinies of generations.
                  </p>
                  <p>
                  In the mystical world of "The Chronicles of Lord
                          Lalji," embark on a journey through time and wisdom as
                          we delve into the enigmatic life and teachings of the
                          revered Lord Lalji. Unveil the secrets of his ancient
                          scrolls, whispered legends, and timeless philosophies
                          that have shaped the destinies of generations.
                  </p>
                  <p>
                  In the mystical world of "The Chronicles of Lord
                          Lalji," embark on a journey through time and wisdom as
                          we delve into the enigmatic life and teachings of the
                          revered Lord Lalji. Unveil the secrets of his ancient
                          scrolls, whispered legends, and timeless philosophies
                          that have shaped the destinies of generations.
                  </p>
                  <p>  In the mystical world of "The Chronicles of Lord
                          Lalji," embark on a journey through time and wisdom as
                          we delve into the enigmatic life and teachings of the
                          revered Lord Lalji. </p>
                </div>
              </div> */}
              {/* <div className="row">
                <div className="col-md-6">
                  <div className="author-bio p-30 mt-80 border-radius-15 bg-white">
                    <div className="author-image mb-4">
                      <Link to="#">
                        <img src={author} alt className="avatar" />
                      </Link>
                      <div className="author-infor">
                        <h5 className="mb-5">Manish Sharma</h5>
                        <p className="mb-0 text-muted font-xs">
                          <span className="mr-10">306 posts</span>
                          <span className="has-dot">Since 2012</span>
                        </p>
                      </div>
                    </div>
                    <div className="author-des">
                      <p>
                        This blog series is a true gem! The Chronicles of Lord
                        Lalji takes us on a captivating journey through history
                        and spirituality, offering profound insights and wisdom
                        that resonate with the soul. I eagerly await each new
                        post to uncover the timeless teachings of Lord Lalji and
                        their relevance in our modern lives. Thank you for
                        sharing this enlightening experience!
                      </p>
                    </div>
                  </div>
                  <div className="author-bio p-30 mt-3 border-radius-15 bg-white">
                    <div className="author-image mb-4">
                      <Link to="#">
                        <img src={author} alt className="avatar" />
                      </Link>
                      <div className="author-infor">
                        <h5 className="mb-5">Manish Sharma</h5>
                        <p className="mb-0 text-muted font-xs">
                          <span className="mr-10">306 posts</span>
                          <span className="has-dot">Since 2012</span>
                        </p>
                      </div>
                    </div>
                    <div className="author-des">
                      <p>
                        This blog series is a true gem! The Chronicles of Lord
                        Lalji takes us on a captivating journey through history
                        and spirituality, offering profound insights and wisdom
                        that resonate with the soul. I eagerly await each new
                        post to uncover the timeless teachings of Lord Lalji and
                        their relevance in our modern lives. Thank you for
                        sharing this enlightening experience!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="comment-form ">
                    <h3 className="mb-4 mt-4 fs-3">Leave Comment</h3>
                    <div className="product-rate d-inline-block mb-30" />
                    <div className="row">
                      <div className="col-lg-11 col-md-12 m-auto">
                        <form
                          className="form-contact comment_form mb-50"
                          action="#"
                          id="commentForm"
                        >
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <textarea
                                  className="form-control w-100"
                                  name="comment"
                                  id="comment"
                                  cols={30}
                                  rows={9}
                                  placeholder="Write Comment"
                                  defaultValue={""}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 c-input">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  name="name"
                                  id="name"
                                  type="text"
                                  placeholder="Name"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6 c-input ">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <input
                                  className="form-control"
                                  name="website"
                                  id="website"
                                  type="text"
                                  placeholder="Website"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group text-start">
                            <button
                              type="submit"
                              className="button button-contactForm"
                            >
                              Post Comment
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Subscribe />
      <Featured />
      <MidFooter />
    </div>
  );
};

export default BlogDetails;

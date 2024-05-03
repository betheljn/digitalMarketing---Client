import { useState } from 'react';
import { useGetArticlesQuery, useGetFeaturedArticlesQuery } from '../../api/articlesApi';
import formatDate from '../Inputs/formatDate';
import TopNavBar from '../landingPage/topNavBar';
import BottomNavBar from '../landingPage/bottomNavBar';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/slick.css";

function Articles() {
  const { data, isLoading, error } = useGetArticlesQuery();
  const { data: featuredData, isLoading: featuredIsLoading, error: featuredError } = useGetFeaturedArticlesQuery();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const articlesPerPage = 5;

  if (isLoading || featuredIsLoading) {
    return <div>Loading...</div>;
  }

  if (error || featuredError) {
    return <div>Error</div>;
  }

  // Filter articles based on search term
  const filteredData = data.filter(article => {
    const lowercaseTitle = article.title.toLowerCase();
    const lowercaseContent = article.content.toLowerCase();
    const lowercaseTags = Array.isArray(article.tags)
      ? article.tags.filter(tag => typeof tag === 'string').map(tag => tag.toLowerCase())
      : [];

    return (
      lowercaseTitle.includes(searchTerm.toLowerCase()) ||
      lowercaseContent.includes(searchTerm.toLowerCase()) ||
      lowercaseTags.some(tag => tag.includes(searchTerm.toLowerCase()))
    );
  });

  // Sort articles from newest to oldest based on createdAt
  const sortedData = filteredData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate start and end index of articles for the current page
  const startIndex = currentPage * articlesPerPage;
  const endIndex = (currentPage + 1) * articlesPerPage;

  // Slice the sorted data array to get articles for the current page
  const articlesForPage = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1); // Adjust to zero-based index
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state when input changes
    setCurrentPage(0); // Reset current page when search term changes
  };

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true, // Enable swipe gestures
    touchMove: true // Enable touch movement
  };

  // Function to convert relative image URLs to absolute URLs
  const convertToAbsoluteURL = (relativeURL) => {
    // Replace this with the base URL of your image server
    const baseURL = "http://localhost:3333/api/imageUpload/files/";
    return baseURL + relativeURL;
  };

  return (
    <div className="subtle-grid-background min-h-screen flex flex-col">
      <TopNavBar />
      <div className="container mx-auto px-10 md:px-10 py-8 max-w-screen-md">
        <h1 className="text-4xl font-bold mb-6 text-center mt-10">Articles</h1>
        <div className="border-b border-black border-2 my-5"></div>
        <div className="mt-5">
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-8">
          <div className="border-b border-black border-2 my-5"></div>
          <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          {/* Slider component for latest articles */}
          <Slider {...settings} className="px-4">
            {articlesForPage.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="h-96 overflow-hidden rounded-t-lg relative">
                  <img src={convertToAbsoluteURL(article.picture)} alt={article.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h2 className="text-lg font-semibold mb-2 text-gray-100">{article.title}</h2>
                    <p className="text-sm text-gray-200 overflow-hidden">{article.content.slice(0, 100)}...</p>
                    <p className="text-gray-300 mt-2">Posted {formatDate(article.createdAt)}</p>
                    <a href={`/articles/${article.id}`} className="absolute inset-0 z-10"></a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredData.length / articlesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg bg-blue-500 text-white ${currentPage === i ? 'bg-blue-700' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* Featured Articles Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featuredData.map((featuredArticle) => (
                  <div key={featuredArticle.id} className="bg-white rounded-lg shadow-md p-4 transition duration-300 hover:shadow-lg hover:border-gray-500 hover:border-2">
                    <img src={convertToAbsoluteURL(featuredArticle.picture)} alt={featuredArticle.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{featuredArticle.title}</h3>
                    <p className="text-gray-700">{featuredArticle.content.slice(0, 100)}...</p>
                    <a href={`/articles/${featuredArticle.id}`} className="text-blue-500 hover:underline">Read More</a>
                  </div>
                ))}
              </div>
          </div>
        </div>
      <BottomNavBar />
    </div>
  );
}

export default Articles;






















import React, { useEffect, useState } from 'react';

import { useGetArticlesByIdQuery, useGetRelatedArticlesQuery } from '../../api/articlesApi';
import { useParams } from 'react-router-dom';
import TopNavBar from '../landingPage/topNavBar';
import BottomNavBar from '../landingPage/bottomNavBar';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function SingleArticle() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetArticlesByIdQuery(id);
  const { data: relatedData, isLoading: relatedIsLoading, error: relatedError } = useGetRelatedArticlesQuery(id);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    if (!relatedIsLoading && !relatedError && relatedData) {
      setRelatedArticles(relatedData); // Update the related articles state with the fetched data
    }
  }, [relatedData, relatedIsLoading, relatedError]);

  if (isLoading || relatedIsLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Article not found</div>;
  }

  const { title, content, tags, picture } = data;

  const convertToAbsoluteURL = (relativeURL) => {
    // Replace this with the base URL of your image server 
    const baseURL = "http://localhost:3333/api/imageUpload/files/";
    return baseURL + relativeURL;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNavBar />
      <div className="container mx-auto px-4 py-8 max-w-screen-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img src={convertToAbsoluteURL(picture)} alt={title} className="w-full h-64 object-cover rounded-lg shadow-md mb-6" />
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          <p className="text-gray-700">{content}</p>
          <div className="mt-4">
            <strong>Tags:</strong>{' '}
            {tags.map((tag, tagIndex) => (
              <React.Fragment key={tagIndex}>
                {tagIndex > 0 && ', '}
                {tag.name}
              </React.Fragment>
            ))}
          </div>
          <div className="border-b my-5"></div>
          <div className="flex justify-center mt-8">
            {/* Facebook Share Button */}
            <FacebookShareButton url={window.location.href} quote="Check out this article from Beltmar">
              <FaFacebook size={32} style={{ marginRight: '1rem' }} />
            </FacebookShareButton>
            
            {/* Twitter Share Button */}
            <TwitterShareButton url={window.location.href} title="Check out this article from Beltmar">
              <FaSquareXTwitter size={32} style={{ marginRight: '1rem' }} />
            </TwitterShareButton>
            
            {/* LinkedIn Share Button */}
            <LinkedinShareButton url={window.location.href} title="Check out this article from Beltmar">
              <FaLinkedin size={32} style={{ marginRight: '1rem' }} />
            </LinkedinShareButton>
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={article.picture} alt={article.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-700">{article.content.slice(0, 100)}...</p>
                <a href={`/articles/${article.id}`} className="text-blue-500 hover:underline">Read More</a>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <BottomNavBar />
        </div>
      </div>
    </div>
  );
}

export default SingleArticle;









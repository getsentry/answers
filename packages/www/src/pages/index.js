import { navigate } from 'gatsby';
import { useEffect } from 'react';

// This page isn't used in production. You're looking for pages/answers.js

const IndexPage = () => {
  useEffect(() => {
    navigate('/answers/');
  }, []);
  return null;
};

export default IndexPage;

import React from 'react';
import styled from 'styled-components';
import ArticleItem from '../ArticleItem/ArticleItem';


const FlexColDiv = styled.div`
  display: flex;
  width: 800px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function ArticleList({ articles }) {
  return (
    <FlexColDiv>
      {/* eslint-disable no-underscore-dangle */}
      {articles.map(article => <ArticleItem key={article._id} article={article} />)}
    </FlexColDiv>
  );
}

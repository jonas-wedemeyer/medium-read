import React from 'react';
import styled from 'styled-components';
import ArticleItem from '../ArticleItem/ArticleItem';


const FlexColDiv = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function ArticleList({ articles, deleteOne }) {
  return (
    <FlexColDiv>
      {articles.map(article => <ArticleItem key={article._id} article={article} deleteOne={deleteOne} />)} {/* eslint-disable-line */}
    </FlexColDiv>
  );
}

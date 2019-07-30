import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import CountDown from '../CountDown/CountDown';

const FlexColDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  background: grey;
  height: 30px;
  width: 750px;
`;

const Poster = styled.div`
  background: grey;
  height: 50px;
  width: 750px;
  background-position: center;
`;

export default function ArticleItem({ article, deleteOne }) {
  return (
    <div style={{ marginBottom: '15px' }}>
      <a href={article.url} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', 'a:visited': 'black' }}>
        <FlexColDiv>
        <Poster style={{ backgroundImage: `url(${article.image})` }} />
          <h4>
            {article.title}
          </h4>
          <InfoBox />
          <CountDown dateAdded={article.date_added} id={article._id} deleteOne={deleteOne} />
        </FlexColDiv>
      </a>
    </div>
  );
}

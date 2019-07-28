import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

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

export default function ArticleItem({ article }) {
  const canvasRef = useRef(null);

  const renderImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 226, 233, canvas.clientWidth, canvas.clientHeight, 0, 0, canvas.clientWidth, canvas.clientHeight); // eslint-disable-line max-len
  };

  useEffect(() => {
    renderImage(article.image);
  });

  return (
    <div style={{ marginBottom: '15px' }}>
      <a href={article.url} rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'none', 'a:visited': 'black' }}>
        <FlexColDiv>
          <canvas width="750px" height="50px" ref={canvasRef}>
            <img src={article.image} alt="hi" />
          </canvas>
          <h4>
            {article.title}
          </h4>
          <InfoBox />
        </FlexColDiv>
      </a>
    </div>
  );
}

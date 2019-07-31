import React from 'react';
import styled from 'styled-components';
import CountDown from '../CountDown/CountDown';


const Card = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  width: 750px;
`;

const FlexColDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: flex-end;
  align-items: center;
  background: #fff;
  height: 30px;
  width: 100%;
`;

const Title = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
`;


export default function ArticleItem({ article, deleteOne }) {
  const Poster = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%
    height: 50px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%), url(${article.image});
  `;

  return (
    <Card>
      <a href={article.url} rel="noopener noreferrer" target="_blank" style={{ }}>
        <FlexColDiv>
          <Poster>
              <Title>
                {article.title}
              </Title>
          </Poster>
          <InfoBox>
            <CountDown dateAdded={article.date_added} id={article._id} deleteOne={deleteOne} />
          </InfoBox>
        </FlexColDiv>
      </a>
      </Card>
  );
}

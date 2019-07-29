import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import refreshTimer from './countDownHelper';

const FlexRowDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const PaddedP = styled.div`
  padding-right: 5px
`;

export default function CountDown({ dateAdded }) {
  // Initial state of the counter
  const [timer, setTimer] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  // Set the initial timer and refresh it every second & remove it from memory
  // once component is unmounted
  useEffect(() => {
    refreshTimer(dateAdded, setTimer);
    const interval = setInterval(refreshTimer, 1000, dateAdded, setTimer);
    return () => clearInterval(interval);
  }, []);

  return (
    <FlexRowDiv>
      <PaddedP>
        {timer.days}
        d
      </PaddedP>
      <PaddedP>
        {timer.hours}
        h
      </PaddedP>
      <PaddedP>
        {timer.minutes}
        m
      </PaddedP>
      <PaddedP>
        {timer.seconds}
        s
      </PaddedP>
    </FlexRowDiv>
  );
}

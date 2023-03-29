import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import {
  white,
  mdYellow,
  mdPink,
  ltViolet,
  mdViolet,
} from '@sentry-static/shared/utils/css/colors';
import { defaultDrop } from '@sentry-static/shared/utils/css/shadows';

const Accordion = props => {
  const [setActive, setActiveState] = useState('');
  const [setHeight, setHeightState] = useState('0px');
  const [setRotate, setRotateState] = useState('accordion__icon');

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '');
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
    );
  }

  return (
    <AccordionItem>
      <AccordionButton
        className={`accordion ${setActive}`}
        onClick={toggleAccordion}
      >
        <AccordionTitle>{props.title}</AccordionTitle>
        <AccordionIcon className={`${setRotate}`}></AccordionIcon>
      </AccordionButton>
      <AccordionContent ref={content} style={{ maxHeight: `${setHeight}` }}>
        <AccordionText>{props.children}</AccordionText>
      </AccordionContent>
    </AccordionItem>
  );
};

const AccordionItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;
const AccordionButton = styled.button`
  background-color: ${white};
  border: none;
  cursor: pointer;
  padding: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  border-radius: 3px;
  outline: none;
  transition: box-shadow 0.5s ease;
  box-shadow: ${defaultDrop};
  &:hover {
    box-shadow: ${defaultDrop}, -0.125rem -0.125rem 0 0.125rem ${mdYellow},
      0 0 0 0.25rem ${mdPink};
  }
`;
const AccordionIcon = styled.div`
  margin-left: auto;
  transition: transform 0.5s ease;
  height: 0.75rem;
  width: 0.75rem;
  border: 0.25rem solid ${ltViolet};
  border-top: none;
  border-left: none;
  transform: rotate(-45deg);
  &.rotate {
    transform: rotate(45deg) translate(-0.125rem, -0.125rem);
  }
`;
const AccordionTitle = styled.p`
  margin: 0;
  color: ${mdViolet};
  letter-spacing: 0.5px;
  flex: 1;
  text-align: left;
`;
const AccordionContent = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease;
`;
const AccordionText = styled.div`
  font-size: 1em;
  padding: 0.5rem 2rem 0 1rem;
  p {
    max-width: 54em;
  }
`;

export default Accordion;

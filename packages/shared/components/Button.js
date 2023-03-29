import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import cn from 'classnames';
import isPropValid from '@emotion/is-prop-valid';

import {
  mqMin,
  screenReadersOnly,
  screenReadersOnlyMobile,
  screenReadersOnlyDesktop,
} from '@sentry-static/shared/utils/css';

import Portrait, { StyledImage as StyledPortraitImage } from './Portrait';
import SmartTarget from './SmartTarget';

const Button = props => {
  return (
    <StyledSmartTarget
      {...props}
      className={cn([
        'btn',
        props.variant,
        props.darkMode && 'dark-mode',
        props.inheritColor && 'inherit-color',
        props.disabled && 'disabled',
        props.compensate && `compensate-${props.compensate}`,
        props.className,
      ])}
    >
      {props.icon && (
        <StyledIcon
          iconOnly={props.iconOnly}
          aria-hidden={true}
          as={props.icon}
        ></StyledIcon>
      )}
      {props.portrait && (
        <StyledPortrait
          iconOnly={props.iconOnly}
          src={props.portrait}
          aria-hidden={true}
        />
      )}
      <StyledLabel iconOnly={props.iconOnly}>{props.children}</StyledLabel>
      {props.chevron && (
        <StyledChevron
          iconOnly={props.iconOnly}
          as={props.chevron}
          aria-hidden={true}
        />
      )}
    </StyledSmartTarget>
  );
};

export const StyledSmartTarget = styled(SmartTarget, {
  shouldForwardProp: prop => {
    switch (prop) {
      case 'iconOnly':
        return false;
      case 'as':
        return true;
      default:
        return isPropValid(prop);
    }
  },
})``;

const StyledIcon = styled('div', {
  shouldForwardProp: prop => {
    switch (prop) {
      case 'iconOnly':
        return false;
      case 'as':
        return false;
      default:
        return isPropValid(prop);
    }
  },
})`
  position: relative;
  flex-shrink: 0;
  transition: margin-right 0.2s, margin-left 0.2s;
  height: 1em;
  width: 1em;
  margin-left: 0;

  + ${() => StyledLabel} {
    margin-left: 0.375em;
  }
`;

const StyledPortrait = styled(Portrait)`
  position: relative;
  flex-shrink: 0;
  transition: margin-right 0.2s, margin-left 0.2s;
  height: 1em;
  width: 1em;
  margin-right: 1em;
  padding-top: 0;

  ${() => StyledPortraitImage} {
    top: -100%;
    right: -100%;
    height: 300%;
    width: 300%;
    max-width: none;
    border: 0;
    box-shadow: none;
  }
`;

const StyledChevron = styled('div', {
  shouldForwardProp: prop => {
    switch (prop) {
      case 'iconOnly':
        return false;
      case 'as':
        return false;
      default:
        return isPropValid(prop);
    }
  },
})`
  position: relative;
  flex-shrink: 0;
  transition: margin-right 0.2s, margin-left 0.2s;
  height: 1em;
  width: 1em;

  ${mqMin('md')} {
    margin-right: -0.375em;
  }
`;

const StyledLabel = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  height: 1em;
  line-height: 1.125em;

  ${({ iconOnly }) => {
    switch (iconOnly) {
      case 'always':
        return screenReadersOnly;
      case 'mobile':
        return screenReadersOnlyMobile;
      case 'desktop':
        return screenReadersOnlyDesktop;
      default:
        return '';
    }
  }};
`;

export const ButtonGroup = styled.div`
  .btn + .btn,
  .btn + .btnwrap,
  .btnwrap + .btn,
  .btnwrap + .btnwrap {
    margin-left: 0.5em;
  }
`;

export const variants = ['primary', 'default', 'quiet', 'silent'];
export const iconOnlys = ['', 'always', 'mobile', 'desktop'];
export const compensations = ['', 'left', 'right'];

Button.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  portrait: PropTypes.string.isRequired,
  chevron: PropTypes.func,
  variant: PropTypes.oneOf(variants).isRequired,
  compensate: PropTypes.oneOf(compensations).isRequired,
  active: PropTypes.bool.isRequired,
  'aria-expanded': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-controls': PropTypes.string,
  onClick: PropTypes.func,
  iconOnly: PropTypes.oneOf(iconOnlys).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

Button.defaultProps = {
  to: '',
  portrait: '',
  variant: 'default',
  compensate: '',
  active: false,
  iconOnly: '',
};

export default Button;

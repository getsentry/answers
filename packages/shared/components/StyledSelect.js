import React from 'react';
import styled from '@emotion/styled';

export default function StyledSelect({ ...props }) {
  return <SelectDropdownStyled {...props} />;
}

const SelectDropdownStyled = styled.select`
  border: 1px solid #cfcfdb;
  border-radius: 0.375rem;
  line-height: 1.5;
  padding: 0.3125rem 2rem 0.3125rem 0.5rem;
  color: #362d59;
  display: block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L3.46967 6.53033C3.17678 6.23744 3.17678 5.76256 3.46967 5.46967C3.76256 5.17678 4.23744 5.17678 4.53033 5.46967L8 8.93934L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z' fill='%239093C1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5em top 50%;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 0 rgba(54, 45, 89, 0.1);
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;

  &:focus {
    border-color: #9093c1;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.5303 5.46967C12.8232 5.76256 12.8232 6.23744 12.5303 6.53033L8.53033 10.5303C8.23744 10.8232 7.76256 10.8232 7.46967 10.5303L3.46967 6.53033C3.17678 6.23744 3.17678 5.76256 3.46967 5.46967C3.76256 5.17678 4.23744 5.17678 4.53033 5.46967L8 8.93934L11.4697 5.46967C11.7626 5.17678 12.2374 5.17678 12.5303 5.46967Z' fill='%23362d59'/%3E%3C/svg%3E");
    outline: none;
  }

  & option {
    font-weight: normal;
  }

  &::-ms-expand {
    display: none;
  }
`;

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import axios, { AxiosRequestConfig } from 'axios';
import Image from 'next/image';

import { colors } from '../../styles/theme';

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  text-align: center;
  background-color: ${colors.background1};

  .no-drinks {
    position: relative;
    width: 50%;
    margin: auto;
    top: 35%;
    font-size: 3rem;
  }

  .drink-card {
    margin: 1rem;

    display: flex;

    text-align: left;

    img {
      width: 300px;
      height: 300px;
      margin-right: 1rem;

      border-radius: 10px;
    }

    h3 {
      font-size: 1.3rem;
    }
  }
`;

const Content = ({ drinks, hasTags }) => {
  return (
    <StyledContent>
      {typeof drinks !== 'string' && drinks?.length > 0 ? (
        drinks?.map((drink, index) => {
          return (
            <div key={index} className="drink-card">
              <img
                src={drink.strDrinkThumb}
                alt={`Image of a ${drink.strDrink}`}
                className="card-image"
              />
              <div className="col">
                <h3>{drink.strDrink}</h3>
                {/* <button className="view-details">View Details</button> */}
              </div>
            </div>
          );
        })
      ) : hasTags === false ? (
        <h2 className="no-drinks">
          Pick a few options on the left to get started.
        </h2>
      ) : (
        <h2 className="no-drinks">
          We dont know any drinks with that combination! Give something else a
          try.
        </h2>
      )}
    </StyledContent>
  );
};

export default Content;

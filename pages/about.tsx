/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../components/nav-bar/navbar';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { breakpoints_max, colors } from '../styles/theme';

const AboutPageContent = styled.div`
  width: 100%;
  padding: 2rem 10rem;

  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  p {
    margin: 1rem 0 3rem 0;
    font-size: 1.2rem;

    a {
      color: ${colors.accent};
    }
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    padding: 1rem;
    margin-top: 5rem;
    text-align: center;
    justify-content: center;

    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    p {
      margin: 1rem 0;
      font-size: 1rem;
    }
  }
`;

const About = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set redux state
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (theme) dispatch(changeTheme(theme));
    }
  });

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="row">
          <SideMenu />
          <AboutPageContent>
            <h1>About Drink Tailor</h1>
            <p>
              The goal of Drink Tailor is to help people easily browse for
              interesting cocktail ideas and recipes, whether you're just
              looking for something to try at the bar, or building them yourself
              at home we hope to make all the information super easy to find.
            </p>
            <h2>Contact Us</h2>
            <p>
              Have some feedback or a suggestion? You can get in touch with us
              at{' '}
              <a href="mailto:DrinkTailor@gmail.com">DrinkTailor@gmail.com</a>
            </p>
          </AboutPageContent>
        </div>
      </div>
    </>
  );
};

export default About;

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';

import { colors } from '../../styles/theme';
import { selectAllTags } from '../common/tag/tagSlice';
import DrinkCard from './drink-card/drink-card';

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
`;

const Content = () => {
  const activeTags: string[] = useSelector(selectAllTags);
  const [drinks, setDrinks] = useState<DrinkBasic[]>([]);
  const [hasTags, setHasTags] = useState<boolean>(false);

  useEffect(() => {
    const handleTagsChange = async () => {
      if (activeTags.length === 0) {
        setDrinks([]);
        setHasTags(false);
        return;
      }

      const drinksRes: DrinkBasic[] = await (
        await axios.get('/api/get/drinks-by-tags?tags=' + activeTags)
      ).data;

      setDrinks(drinksRes);
      setHasTags(true);
    };

    handleTagsChange();
  }, [activeTags]);

  return (
    <StyledContent>
      {typeof drinks !== 'string' && drinks?.length > 0 ? (
        drinks?.map((drink, index) => {
          return <DrinkCard key={index} drink={drink} />;
        })
      ) : !hasTags ? (
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

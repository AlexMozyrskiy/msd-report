import { FC } from 'react';
import SVG from 'react-inlinesvg';

import searchIcon from 'src/library/icons/header/search.svg';

import st from './index.module.scss';

const Search: FC = () => {
  return (
    <div className={st.search}>
      {/* Когда реализую поиск тогда раскомментирую */}
      {/* <figure>
        <SVG src={searchIcon} />
      </figure>
      <input placeholder='search' /> */}
    </div>
  );
};

export default Search;

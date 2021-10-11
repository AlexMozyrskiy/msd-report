import { FC } from 'react';
import SVG from 'react-inlinesvg';

import st from './index.module.scss';

interface SearchProps {
  icon: string;
}

const Search: FC<SearchProps> = ({ icon }) => {
  return (
    <div className={st.search}>
      {/* Когда реализую поиск тогда раскомментирую */}
      {/* <figure>
        <SVG src={icon} />
      </figure>
      <input className={st.search} placeholder='search' /> */}
    </div>
  );
};

export default Search;

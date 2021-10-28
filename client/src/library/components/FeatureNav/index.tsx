import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { getUser as getUserSelector } from 'src/state/redux/features/user/selectors';

import { IRoute } from 'src/pages/common/Video/routes';

import st from './index.module.scss';

interface IFeatureNav {
  tagsRoutes: IRoute[];
}

const FeatureNav: FC<IFeatureNav> = ({ tagsRoutes }) => {
  const { role } = useSelector(getUserSelector);

  const history = useHistory();
  /*
    не использовали NavLink для определния activeClassname потому,
    что в core в роутах exact у роута '/admin' === false и вкладка
    Home получается постоянно автивна
  */
  const [activeLinkPath, setActiveLinkPath] = useState<string>(history.location.pathname);

  return (
    <nav className={st.admin__tags}>
      <ul className={st.admin__list}>
        {tagsRoutes.map(
          (route) =>
            role?.includes(route.availableRole) && (
              <li key={route.path} onClick={() => setActiveLinkPath(route.path)}>
                <Link
                  to={route.path}
                  className={cn(st.admin__list__item, {
                    [st.admin__list__item_active]: route.path === activeLinkPath,
                  })}
                >
                  {route.linkText}
                </Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
export default FeatureNav;

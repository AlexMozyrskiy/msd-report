import { FC, useState } from 'react';
import { Link, Switch, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { tagsRoutes } from './routes';
import { getUser as getUserSelectior } from 'src/state/redux/features/user/selectors';

import NotFound from '../common/NotFound';

import st from './index.module.scss';

const Admin: FC = () => {
  const { role } = useSelector(getUserSelectior);

  const history = useHistory();
  /*
    не использовали NavLink для определния activeClassname потому,
    что в core в роутах exact у роута '/admin' === false и вкладка
    Home получается постоянно автивна
  */
  const [activeLinkPath, setActiveLinkPath] = useState<string>(history.location.pathname);

  return (
    <section className={st.admin}>
      <nav className={st.admin__tags}>
        <ul className={st.admin__list}>
          {tagsRoutes.map((route) => (
            <li key={route.path} onClick={() => setActiveLinkPath(route.path)}>
              <Link
                to={route.path}
                className={cn(st.admin__list__item, { [st.admin__list__item_active]: route.path === activeLinkPath })}
              >
                {route.linkText}
              </Link>
            </li>
          ))}
        </ul>

        <Switch>
          {tagsRoutes.map(
            (route) =>
              role?.includes('admin') && (
                <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
              )
          )}

          <NotFound />
        </Switch>
      </nav>
    </section>
  );
};

export default Admin;

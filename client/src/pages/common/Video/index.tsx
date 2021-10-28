import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getUser as getUserSelector } from 'src/state/redux/features/user/selectors';
import { tagsRoutes } from './routes';

import NotFound from 'src/pages/common/NotFound';

import FeatureNav from 'src/library/components/FeatureNav';

import st from './index.module.scss';

const Video: FC = () => {
  const { role } = useSelector(getUserSelector);

  return (
    <section className={st.video}>
      <FeatureNav tagsRoutes={tagsRoutes} />

      <Switch>
        {tagsRoutes.map(
          (route) =>
            role?.includes(route.availableRole) && (
              <Route exact={route.exact} path={route.path} component={route.component} key={route.path} />
            )
        )}

        <NotFound />
      </Switch>
    </section>
  );
};

export default Video;

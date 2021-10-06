import { FC } from 'react';
import { Route, Switch } from 'react-router';

import { routes } from '../../core/Routes';

const Rotes: FC = () => {
  return (
    <Switch>
      {routes.map((item) => (
        <Route exact={item.exact} path={item.route} component={item.component} />
      ))}
      <div>404</div>
    </Switch>
  );
};

export default Rotes;

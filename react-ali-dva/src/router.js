import React from 'react';
import { Router, Route, Switch } from 'dva/router';

// 页面
import IndexPage from './routes/index/IndexPage';
import UserList from './routes/user/UserList'
import UserInfo from './routes/user/UserInfo'

// 路由配置
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/user/list" exact component={UserList} />
        <Route path="/user/info/:id" exact component={UserInfo} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

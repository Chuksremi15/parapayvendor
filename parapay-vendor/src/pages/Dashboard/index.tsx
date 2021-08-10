import React from "react";
import Statistics from "./Statistics";
import Contestants from "./Contestants";
import Contestant from "./Contestant";
import UpdateContestant from "./UpdateContestant";
import Evictions from "./Evictions";
import UpForEviction from "./UpForEviction";
import Eviction from "./Eviction";
import { PageWrapper } from "../components";
import { Switch, Route, RouteComponentProps } from "react-router-dom";
import AddContestants from "./Addcontestant";
import AddEviction from "./AddEviction";
import VoteSettings from "./VoteSettings";
import Wallet from "./Wallet";

const Dashboard: React.FC<RouteComponentProps> = ({
  match: { path },
}): JSX.Element => {
  return (
    <PageWrapper>
      <Switch>
        <Route exact path={path} component={Statistics} />
        <Route path={`${path}/contestants`} component={Contestants} />
        <Route path={`${path}/add-contestants`} component={AddContestants} />
        <Route
          path={`${path}/edit-contestant/:id`}
          component={UpdateContestant}
        />
        <Route path={`${path}/contestant/:id`} component={Contestant} />
        <Route path={`${path}/evicted`} component={Evictions} />
        <Route path={`${path}/add-eviction`} component={AddEviction} />
        <Route path={`${path}/up-for-eviction`} component={UpForEviction} />
        <Route path={`${path}/eviction/:id`} component={Eviction} />
        <Route path={`${path}/vote-settings`} component={VoteSettings} />
        <Route path={`${path}/wallet`} component={Wallet} />
      </Switch>
    </PageWrapper>
  );
};

export default Dashboard;

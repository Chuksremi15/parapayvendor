import React, { useLayoutEffect } from "react";
import { DashboardCard } from "../../components";
import { Box, Wrap, WrapItem, Text } from "@chakra-ui/react";
import { formatAmount } from "../../../utils";
import contestants from "../../../assets/contestants-slant.svg";
import evicted from "../../../assets/evicted-slant.svg";
import money from "../../../assets/money-bag-slant.svg";
import upForEviction from "../../../assets/up-for-eviction-slant.svg";
import votes from "../../../assets/vote-slant.svg";

import { SectionSpinner, WalletHistoryTable } from "../../components";

// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  AppState,
  getContestantsRequest,
  getDashboardStartsRequest,
  getWalletHistoryRequest,
} from "../../../redux";

const Statistics: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const {
    token,
    loading,
    transactions,
    dashboard_data,
    walletHistory,
  } = useSelector((state: AppState) => {
    const { token } = state.auth;

    const { dashboard_data, transactions } = state.dashboardStarts;

    const { dashboardStarts: loading, walletHistory } = state.loadingIndicators;
    return {
      token,
      loading,
      dashboard_data,
      walletHistory,
      transactions,
    };
  });

  useLayoutEffect(() => {
    dispatch(getDashboardStartsRequest({ token }));

    dispatch(getWalletHistoryRequest({ token }));
  }, [getDashboardStartsRequest, getWalletHistoryRequest]);

  return (
    <Box className="padding-top-lg padding-horizontal-xlg">
      <Text mb={5} className="font-md color-primary font-weight-600">
        Dashboard
      </Text>

      {loading ? (
        <Box pt={100}>
          <SectionSpinner spinning={true} />
        </Box>
      ) : (
        <Wrap spacing={5}>
          <WrapItem>
            <DashboardCard
              caption="No. of Contestants"
              value={dashboard_data?.no_of_contestant}
              icon={contestants}
            />
          </WrapItem>
          {/* <WrapItem>
            <DashboardCard
              caption="Up for Eviction"
              value={56}
              icon={upForEviction}
            />
          </WrapItem> */}
          <WrapItem>
            <DashboardCard
              caption="Evicted Contestants"
              value={dashboard_data?.no_of_evicted_contestants}
              icon={evicted}
            />
          </WrapItem>
          <WrapItem>
            <DashboardCard
              caption="Total no. of votes"
              value={dashboard_data?.total_no_of_votes}
              icon={votes}
            />
          </WrapItem>
          <WrapItem>
            <DashboardCard
              caption="Total value of votes"
              value={dashboard_data?.total_value_of_votes}
              icon={money}
            />
          </WrapItem>
        </Wrap>
      )}

      <Box mt={50}>
        {walletHistory ? (
          <Box pt={300}>
            <SectionSpinner spinning={true} />
          </Box>
        ) : (
          <Box>
            <WalletHistoryTable transactions={transactions} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Statistics;

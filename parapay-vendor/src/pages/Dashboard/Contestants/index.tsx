import React, { useLayoutEffect } from "react";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
} from "../../components";
import { Box } from "@chakra-ui/react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { AppState, getContestantsRequest } from "../../../redux";

const Contestants: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const { token, contestantsLoading, contestants } = useSelector(
    (state: AppState) => {
      const { token } = state.auth;

      const { contestants: contestantsLoading } = state.loadingIndicators;
      const { contestants } = state.contestant;

      return {
        token,
        contestants,
        contestantsLoading,
      };
    }
  );

  useLayoutEffect(() => {
    dispatch(getContestantsRequest({ token }));
  }, [getContestantsRequest]);

  return (
    <Box>
      <FilterHeader
        title="Contestants"
        buttonLink="Add Contestant"
        url="/dashboard/add-contestants"
      />
      <Box className="padding-top-lg padding-horizontal-xlg">
        {contestantsLoading ? (
          <SectionSpinner spinning={true} />
        ) : (
          <ContestantsTable contestants={contestants} />
        )}
      </Box>
    </Box>
  );
};

export default Contestants;

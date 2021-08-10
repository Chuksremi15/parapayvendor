import React, { useLayoutEffect, useEffect } from "react";
import {
  FilterHeader,
  ContestantsTable,
  useAjaxToast,
  FullScreenSpinner,
} from "../../components";
import { Box } from "@chakra-ui/react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { AppState, getEvictedContestantsRequest } from "../../../redux";
import { EvictedontestantsTable } from "../../../components/Tables/EvictedContestantsTable";

const Evicted: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const toast = useAjaxToast();

  const { token, loading, error, contestants } = useSelector(
    (state: AppState) => {
      const { token } = state.auth;

      const { evictedContestants: loading } = state.loadingIndicators;

      const { contestants } = state.contestant;

      const {
        errors: { evictedContestants: error },
      } = state.ajaxStatuses;

      return {
        loading,
        error,
        token,
        contestants,
      };
    }
  );

  useEffect(() => {
    if (error)
      toast({
        status: "error",
        description: error,
      });
  }, [error]);

  useLayoutEffect(() => {
    dispatch(getEvictedContestantsRequest({ token }));
  }, []);

  return (
    <Box>
      {loading ? (
        <FullScreenSpinner spinning={true} />
      ) : (
        <Box className="padding-top-lg padding-horizontal-xlg">
          <EvictedontestantsTable contestants={contestants} />
        </Box>
      )}
    </Box>
  );
};

export default Evicted;

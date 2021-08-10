import React, { useLayoutEffect } from "react";
import {
  FilterHeader,
  SectionSpinner,
  UpForEvictionTable,
} from "../../components";
import { Box } from "@chakra-ui/react";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { AppState, getEvictionsRequest } from "../../../redux";

const UpForEviction: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const { token, evictionsLoading, evictions } = useSelector(
    (state: AppState) => {
      const { token } = state.auth;

      const { evictions, evictionsLoading } = state.eviction;

      return {
        token,
        evictions,
        evictionsLoading,
      };
    }
  );

  useLayoutEffect(() => {
    dispatch(getEvictionsRequest({ token }));
  }, [evictionsLoading]);

  return (
    <Box>
      <FilterHeader
        title="Up for Eviction"
        buttonLink="Add eviction"
        url="/dashboard/add-eviction"
      />
      <Box className="padding-top-lg padding-horizontal-xlg">
        {evictionsLoading ? (
          <SectionSpinner spinning={true} />
        ) : (
          <UpForEvictionTable evictions={evictions} />
        )}
      </Box>
    </Box>
  );
};

export default UpForEviction;

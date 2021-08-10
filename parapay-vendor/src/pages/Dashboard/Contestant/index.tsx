import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import {
  FilterHeader,
  SectionSpinner,
  ContestantsTable,
} from "../../components";
import { Box } from "@chakra-ui/react";

import { RouteComponentProps } from "react-router-dom";

// redux import
import { useSelector, useDispatch } from "react-redux";
import { AppState, getContestantRequest } from "../../../redux";

const Contestant: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: { params },
}): JSX.Element => {
  const dispatch = useDispatch();

  const { token, contestantLoading, contestant } = useSelector(
    (state: AppState) => {
      const { token } = state.auth;

      const { contestant, contestantLoading } = state.contestant;

      return {
        token,
        contestant,
        contestantLoading,
      };
    }
  );

  const id = params.id;
  useLayoutEffect(() => {
    dispatch(getContestantRequest({ token, id }));
    console.log(contestant);
  }, [contestantLoading]);

  return (
    <Box>
      <Box className="padding-top-lg padding-horizontal-xlg">
        {contestantLoading ? (
          <SectionSpinner spinning={true} />
        ) : (
          <div className="eviction-card">
            <p className="heading">Contestant Details</p>
            <div className="display-grid-2">
              <div>
                <p className="eviction-name">Name</p>
                <p className="eviction-heading">
                  {contestant?.firstname} {contestant?.lastname}
                </p>
                <p className="eviction-name">NickName</p>
                <p className="eviction-heading">{contestant?.nickname} </p>
                <p className="eviction-name">Gender</p>
                <p className="eviction-heading">{contestant?.gender} </p>
                <p className="eviction-name">Status</p>
                <p className="eviction-heading">{contestant?.status}</p>
              </div>

              <div className="eviction-image img-wrap">
                <img
                  src={contestant?.contestant_image}
                  alt="contestant image"
                />
              </div>
            </div>

            <p className="eviction-name">{contestant?.description} </p>

            <Link to={`/dashboard/edit-contestant/${contestant?._id}`}>
              <div className="card-btn  card-btn-bg">Edit</div>
            </Link>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Contestant;

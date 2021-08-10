import React, { Fragment } from "react";
import { Box } from "@chakra-ui/react";
import { HorizontalNavBar, LeftSidebar } from "../index";
const PageWrapper: React.FC = ({ children }): JSX.Element => {
  return (
    <Fragment>
      <section className="account d-flex">
        <LeftSidebar />
        <div className="wrapper d-flex column position-relative align-items-center">
          <HorizontalNavBar />
          <Box p="20px 60px" as={"main"} className="main padding-bottom-lg">
            {children}
          </Box>
        </div>
      </section>
    </Fragment>
  );
};

export default PageWrapper;

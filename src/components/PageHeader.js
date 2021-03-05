import {Link} from "react-router-dom";
import React from "react";

const PageHeader = (props) => {
  const {heading} = props;
  const [item0, item1, item2] = heading;
  return (
    <Link to={`/`}>
      <header>
        {item0 && <h3>{item0}</h3>}
        {item1 && <h3>{item1}</h3>}
        {item2 && <h3>{item2}</h3>}
      </header>
    </Link>
  );
};

export default PageHeader;
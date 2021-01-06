import React from "react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const HomepageButton = (props) => {
  const { text, path } = props;
  return (
    <div className="button--homepage">
      <Button>
        <Link to={path}>{text}</Link>
        <MdAdd size="2em" color="white" />
      </Button>
    </div>
  );
};

export default HomepageButton;

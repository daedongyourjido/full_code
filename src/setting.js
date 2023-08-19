import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/setting/change");
  });
}

export default Setting;

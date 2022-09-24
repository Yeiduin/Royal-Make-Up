import React, { useEffect } from "react";
import { useState } from "react";
import { useNav } from "../../hooks/useNav";

import "./alertPaypal.css";

export const Alert = ({ msg, ok }) => {
  const { goHome } = useNav();
  useEffect(() => {
    setTimeout(() => {
      goHome();
    }, 2000);
  }, []);

  return (
    <div className={`alertPaypal anim-translate-to-down ${!ok && "alertError"}`}>
      {msg}
      {ok ? (
        <img src="https://i.postimg.cc/sDBg9m3r/check.gif" alt="" />
      ) : (
        <></>
      )}
    </div>
  );
};

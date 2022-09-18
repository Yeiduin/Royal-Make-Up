import React from "react";
import { CardDetails } from "../components/Details/CardDetails";
import { useGlobalServices } from "../hooks/useGlobalServices";
import { useNav } from "../hooks/useNav";
import { sectionPaguination } from "../assets/css/list-products/pagination.module.css";

export const Details = () => {
  const { redirectPage } = useNav();
  const {
    global: { actualPage },
  } = useGlobalServices();
  
  return (
    <div>
      <CardDetails />
      <section className={sectionPaguination}>
        <button
          onClick={() => {
            redirectPage(actualPage);
          }}
        >
          Back
        </button>
      </section>
    </div>
  );
};

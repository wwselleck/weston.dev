import React from "react";
import { renderRoot } from "./root-template";

export function renderSecondaryPage(el: React.ReactNode, subtitle?: string) {
  return renderRoot(<SecondaryPageWrapper>{el}</SecondaryPageWrapper>, {
    subtitle,
  });
}

const SecondaryPageWrapper: React.FC = ({ children }) => {
  return (
    <div>
      <div className="my-16 sm:w-2/3 w-5/6 mx-auto">
        <div className="mb-8">
          <a href="/">&#60; Home</a>
        </div>
        {children}
      </div>
    </div>
  );
};

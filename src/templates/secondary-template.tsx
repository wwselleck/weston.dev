import React from "react";
import { renderRoot } from "./root-template";

export function renderSecondaryPage(el: React.ReactNode, subtitle?: string) {
  return renderRoot(
    <SecondaryPageWrapper title={subtitle}>{el}</SecondaryPageWrapper>,
    {
      subtitle,
    }
  );
}

const SecondaryPageWrapper: React.FC<{ title?: string }> = ({
  title,
  children,
}) => {
  return (
    <div>
      {title && <h1 className="mb-8">{title}</h1>}
      {children}
    </div>
  );
};

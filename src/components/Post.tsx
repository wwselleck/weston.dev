import * as React from "react";

export const Header: React.FC = ({ children }) => {
  return <div className={`text-4xl mb-10`}>{children}</div>;
};

export const HeaderSm: React.FC = ({ children }) => {
  return <div className={`text-2xl mb-2`}>{children}</div>;
};

export const Text: React.FC = ({ children }) => {
  return <div className="mb-2">{children}</div>;
};

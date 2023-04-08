import * as React from "react";
import { Nav } from "./Nav";

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="w-1/2 min-w-[860px] mx-auto my-32">
      <div className="mb-32">
        <Nav />
      </div>
      {children}
    </div>
  );
};

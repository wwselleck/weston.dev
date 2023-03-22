import * as React from "react";
import { Nav } from "./Nav";

export const PageWrapper: React.FC = ({ children }) => {
  return (
    <div className="w-1/2 mx-auto my-32">
      <div className="mb-32">
        <Nav />
      </div>
      {children}
    </div>
  );
};

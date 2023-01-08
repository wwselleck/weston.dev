import * as React from "react";
import { renderRoot } from "./root-template";

export function renderHomePage(el: React.ReactNode) {
  return renderRoot(el, {
    scripts: ["public/index.js"],
  });
}

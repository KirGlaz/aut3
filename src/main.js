import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}


import "./scripts/works";
import "./scripts/skills";
import "./scripts/paralax";
import "./scripts/menu-phone";
import "./scripts/reviews";


declare module "*.svg" {
    import React from "react";
    export const ReactComponent:React.FC<React.SVGProps<SVGSVGElement>>;
    const src : string;
    export default src;
}


// Type script needs this module declaration for accepting svg icons
// this is added in tsconfig file in includes
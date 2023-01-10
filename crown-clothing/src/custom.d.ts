declare module "*.svg" {
    import React from "react";
    export const ReactComponent:React.FC<React.SVGProps<SVGSVGElement>>;
    const src : string;
    export default src;
}


// Type sctrip needs this module declaration for accpting svg icons
// this is added in tsconfig file in includes
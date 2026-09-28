import jsLogo from "./imgs/js/javascript-original.svg";
import tsLogo from "./imgs/js/typescript-original.svg";
import nodeLogo from "./imgs/js/node-js-brands-green.svg";
import reactLogo from "./imgs/js/react-original.svg";
import fastifyLogo from "./imgs/js/fastify-white.svg";
import expressLogo from "./imgs/js/express-white-outline.svg";
import bunLogo from "./imgs/js/bun-original.svg";
import reactRouterWhiteLogo from "./imgs/js/react-router-white.svg"
import tanStackLogo from "./imgs/js/tanstack-query.svg"
import type {HxW} from "../types/HxW.d.ts";


const JsLogo = ({ h, w }:HxW) => <img src={jsLogo} height={h ?? 40} width={w ?? 40} />;
const TsLogo = ({ h, w }:HxW) => <img src={tsLogo} height={h ?? 40} width={w ?? 40} />;
const FastifyLogo = ({ h, w }:HxW) => <img src={fastifyLogo} height={h ?? 40} width={w ?? 40} />;
const NodeLogo = ({ h, w }:HxW) => <img src={nodeLogo} height={h ?? 40} width={w ?? 40} />;
const ReactLogo = ({ h, w }:HxW) => <img src={reactLogo} height={h ?? 40} width={w ?? 40} />;
const BunLogo = ({ h, w }:HxW) => <img src={bunLogo} height={h ?? 40} width={w ?? 40} />;
const ExLogo = ({ h, w }:HxW) => <img src={expressLogo} height={h ?? 40} width={w ?? 40} />;
const ReactRouterLogo = ({ h, w }:HxW) => <img src={reactRouterWhiteLogo} height={h ?? 40} width={w ?? 40} />;
const TanStackLogo = ({ h, w }:HxW) => <img src={tanStackLogo} height={h ?? 40} width={w ?? 40} />;

export { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo, BunLogo, ExLogo, TanStackLogo, ReactRouterLogo };

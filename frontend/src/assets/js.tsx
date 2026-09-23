import jsLogo from "./imgs/javascript-original.svg";
import tsLogo from "./imgs/typescript-original.svg";
import nodeLogo from "./imgs/node-js-brands-green.svg";
import reactLogo from "./imgs/react-original.svg";
import fastifyLogo from "./imgs/fastify-white.svg";
import expressLogo from "./imgs/express-white-outline.svg";
import bunLogo from "./imgs/bun-original.svg";
import type {HxW} from "../types/HxW.d.ts";


const JsLogo = ({ h, w }:HxW) => <img src={jsLogo} height={h ?? 40} width={w ?? 40} />;
const TsLogo = ({ h, w }:HxW) => <img src={tsLogo} height={h ?? 40} width={w ?? 40} />;
const FastifyLogo = ({ h, w }:HxW) => <img src={fastifyLogo} height={h ?? 40} width={w ?? 40} />;
const NodeLogo = ({ h, w }:HxW) => <img src={nodeLogo} height={h ?? 40} width={w ?? 40} />;
const ReactLogo = ({ h, w }:HxW) => <img src={reactLogo} height={h ?? 40} width={w ?? 40} />;
const BunLogo = ({ h, w }:HxW) => <img src={bunLogo} height={h ?? 40} width={w ?? 40} />;
const ExLogo = ({ h, w }:HxW) => <img src={expressLogo} height={h ?? 40} width={w ?? 40} />;

export { JsLogo, TsLogo, FastifyLogo, ReactLogo, NodeLogo, BunLogo, ExLogo };

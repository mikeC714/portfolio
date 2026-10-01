import hammer from "./imgs/hammer.png";
import type {HxW} from "../types/HxW.d.ts";

export const Hammer = ({ h, w }:HxW) => <img src={hammer} height={h ?? 60} width={w ?? 60} />
 

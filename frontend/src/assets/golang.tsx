import goLogo from "./imgs/go-original.svg"; 
import type {HxW} from "../types/HxW.d.ts";

export const GoLogo = ({ h, w }:HxW) => <img src={goLogo} height={h ?? 60} width={w ?? 60} />

          

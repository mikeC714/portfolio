import wasmLogo from "./imgs/webassembly-original.svg";
import type {HxW} from "../types/HxW.d.ts";

export const WasmLogo = ({ h, w }:HxW) => <img src={wasmLogo} height={h ?? 60} width={w ?? 60} />

          

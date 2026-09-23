import rustLogo from "./imgs/rust-original.svg";
import type {HxW} from "../types/HxW.d.ts";

export const RustLogo = ({ h, w }:HxW) =><img src={rustLogo} height={h ?? 60} width={w ?? 60} />




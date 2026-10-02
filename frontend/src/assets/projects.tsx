import tlogLogo from "./imgs/projects/tlog_logo.png";
import machine2Pi from "./imgs/projects/machine2pi.png";
import spiderLogo from "./imgs/projects/spider_logo.png";
import type {HxW} from "../types/HxW.d.ts";


const Tlog = ({ h, w }:HxW) => <img src={tlogLogo} height={h ?? 60}width={w ?? 60}  style={{ borderRadius: "10px" }}/>
const Machine2Pi = ({ h, w }:HxW) => <img src={machine2Pi} height={h ?? 60}width={w ?? 60} style={{ borderRadius: "10px" }} />
const Spider = ({ h, w }:HxW) => <img src={spiderLogo} height={h ?? 60}width={w ?? 60} style={{ borderRadius: "10px" }} />


export { Tlog, Machine2Pi, Spider };



import psql from "./imgs/postgresql-original.svg"
import sqlite from "./imgs/sqlite-original.svg"
import type {HxW} from "../types/HxW.d.ts";


const PostgresLogo = ({ h, w }:HxW) => <img src={psql} height={h ?? 40} width={w ?? 40} />;
const SqliteLogo = ({ h, w }:HxW) => <img src={sqlite} height={h ?? 40} width={w ?? 40} />;

export { PostgresLogo, SqliteLogo };

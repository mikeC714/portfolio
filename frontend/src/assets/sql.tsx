import psql from "./imgs/postgresql-original.svg"
import sqlite from "./imgs/sqlite-original.svg"

const PostgresLogo = () => <img src={psql} height={40} width={40} />;
const SqliteLogo = () => <img src={sqlite} height={40} width={40} />;

export { PostgresLogo, SqliteLogo };

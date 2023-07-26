import { knex } from "knex"


// Fazer um Classe abstrata para ninguem poder mexer nela,e só poder herdar
export abstract class BaseDatabase {
    // Protect é só para as filhas usarem esse encapsulamento:
    // Static
    protected static connection = knex({
        client: "sqlite3",
        connection: {
            filename: "./src/sql/exercicio-poo.db", //localização do seu arquivo .db
        },
        useNullAsDefault: true, // definirá NULL quando encontrar valores undefined
        pool: {
            min: 0, // número de conexões, esses valores são os recomendados para sqlite3
            max: 1,
                    afterCreate: (conn: any, cb: any) => {
                conn.run("PRAGMA foreign_keys = ON", cb)
            } // configurando para o knex forçar o check das constrainst FK
        }
    })
}


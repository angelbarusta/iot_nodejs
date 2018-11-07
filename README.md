# iot_nodejs
## proyecto de prueba con node.js aplicado al internet de las cosas

```js
const setupDatabase = require('iot-db');

setupDatabase(confg).them(db =>{
   const { Agent, Metric } =db
    
}).catch(err => console.error(err))
```

#NOTAS PARA LA DB

## Para ir a la configuracion de postgres desde la terminal
cd /usr/local/var/postgres normal mente donde instales postgresSQL

en el archivo pg_hba.conf es donde se configura los parametros:

```js
# TYPE  DATABASE        USER            CIDR-ADDRESS            METHOD

# IPv4 local & remote connections:
host    all             all             ***.*.*.****           trust
host    all             all             0.0.0.0/0               md5
# IPv6 local connections:
host    all             all             ::1/128                 trust
```
//--------------------------------------------------------------------------

si cambiamos el dato "trust" a "password" una ves reiniciado el servicio 
```js
# TYPE  DATABASE        USER            CIDR-ADDRESS            METHOD

# IPv4 local & remote connections:
host    all             all             ***.*.*.****            password
host    all             all             0.0.0.0/0               password
# IPv6 local connections:
host    all             all             ::1/128                 password
```
utilizando "brew services restart postgresql"

#Una vez hecho lo anterior
introducir en la terminal "psql -U NAME_USER NAME_DB"

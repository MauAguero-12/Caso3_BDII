import App from './app';
import * as  http from 'http'
import { Logger } from './common'
require('./conexion'); //importa el archivo de conexion

const port = 5000;  //abre una conexión en el puerto 5000
const logger = new Logger();

App.set('port', port);
const server = http.createServer(App);
server.listen(port);


server.on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`)
 });

module.exports = App;
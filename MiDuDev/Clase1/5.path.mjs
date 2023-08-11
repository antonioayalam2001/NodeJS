import path from 'path';
import { fileURLToPath } from 'url';


//barra separadora de rutas
console.log(path.sep);
// Unir rutas
const path1 = path.join('carpeta1', 'carpeta2', 'archivo.txt');
console.log(path1);

// Nombre base
const path2 = path.basename("carpeta1/carpeta2/archivo.txt");
console.log(path2);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);
/*
Buffers
	Una tira de bytes (datos binarios)
	Similar a un array de enteros
	Tamaño fijo
	Manipular datos directamente
		Sockets
		Streams
		Implementar protocolos complejos
		Manipulación de ficheros/imágenes
		Criptografía
*/
"use strict";

var buf = Buffer.allocUnsafe(100),
  buf2 = Buffer.allocUnsafe(26),
  // Realzando la suma con forma de unicode

  str = "\u00bd + \u00bc = \u00be";

buf.write("abcd", 0, 4, "ascii");

console.log(
  buf,
  buf.toString("ascii"),
  str +
    `Noa presenta la forma en que los caracteres son impreseos con la caracteristica UNICODE de la suma\n`,
  str.length +
    "caracteres que ocupa en su forma hexadecimal (son 8 posiciones totales)\n",
  Buffer.byteLength(str, "utf8") + "bytes",
  // Cantidad de Bytes que instanciamos inicialmente en nuestro buffer
  buf2.length
);

for (var i = 0; i < buf2.length; i++) {
  // 97 en ASCII es a
  buf2[i] = i + 97;
}

console.log(buf2.toString("ascii"));


console.log(
  `Nuestro Buffer es de ${buf.length} bytes y su contenido es: ${buf.toString("ascii")} \n Forma en que es impreso con caracteristica UNICODE ${str} con una cantidad de ${str.length} y posee   t${Buffer.byteLength(str, "utf8")}  bytes totales, consideramos forma hexadecimal\n La cantidad de bytes que alojamos en nuetsro Buffer de forma inicial es de ${buf2.length}`
)

console.log(str.byteLength);
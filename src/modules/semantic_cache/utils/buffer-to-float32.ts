import { HttpStatusCode } from 'axios';
import HttpException from '../../../shared/exceptions/http-exception';

export function bufferToFloat32Array(
  buf: Buffer,
): Float32Array {
  // Transforms Node Buffer in ArrayBuffer
  // input: <Buffer 6d e7 fb 3d d5 78 e9 be e7 fb 49 3f>
  // output: Float32Array(3) [0.12300000339746475, -0.4560000002384186, 0.7889999747276306]
  if (buf.length % 4 !== 0) {
    throw new HttpException(
      `Invalid buffer size ${buf.length}. Float32 must be divisible for 4 bytes.`,
      HttpStatusCode.BadRequest,
    );
  }
  
  const arrayBuffer = buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  );

  return new Float32Array(arrayBuffer);
}

export function float32ArrayToBuffer(arr: number[] | Float32Array): Buffer {
  // input: [0.123, -0.456, 0.789]
  // output: <Buffer 6d e7 fb 3d d5 78 e9 be e7 fb 49 3f>
  const float32Array = arr instanceof Float32Array ? arr : new Float32Array(arr);

  return Buffer.from(float32Array.buffer, float32Array.byteOffset, float32Array.byteLength);
}

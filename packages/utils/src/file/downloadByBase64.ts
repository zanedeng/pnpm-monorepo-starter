import { dataURLtoBlob } from '../base64'
import { downloadByData } from './downloadByData'

export function downloadByBase64(
  buf: string,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

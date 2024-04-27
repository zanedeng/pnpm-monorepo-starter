import { urlToBase64 } from '../base64'
import { downloadByBase64 } from './downloadByBase64'

export function downloadByOnlineUrl(
  url: string,
  filename: string,
  mime?: string,
  bom?: BlobPart
) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

import { getStrapiURL } from "./api"

export function getStrapiMedia({media}) {
//  console.log(getStrapiURL(media))
  const url = getStrapiURL(media) 
  const imageUrl = url.startsWith("/")
  // console.log(url)
  return imageUrl
}

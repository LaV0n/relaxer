import { instanceJoke } from './instance'

export const humorApi = {
   getJoke({ category, flags }: ReqType) {
      return instanceJoke.get(`joke/${category}?blacklistFlags=${flags}&type=single`)
   },
}

export type ReqType = {
   category: string
   flags: string
}

export type TGenerateShortURL = {
  maxAttempts: number
  url: string
}

export type TURLMapping = Record<string, string>

export type TShorterURLSecureResult = {
  shortURL: string
}

export type TBaseURL = {
  short_url: string
  long_url: string
  visit: number
}

export type TURL = TBaseURL & {
  id: number
}

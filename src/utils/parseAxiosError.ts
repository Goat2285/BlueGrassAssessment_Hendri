import axios, { AxiosError } from 'axios'

type errorObjectType = AxiosError | unknown

export const parseAxiosError = (error: errorObjectType) => {
  if (axios.isAxiosError(error)) {
    console.log(error)
    const { message, code, response } = error
    const status = response?.status
    if (status === 500) {
      return ['An error has occured while submitting please try again']
    }
    return response?.data
  }   
  return ['An error has occured while submitting please try again']
}
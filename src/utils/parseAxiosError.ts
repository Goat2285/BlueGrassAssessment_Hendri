import axios, { AxiosError } from 'axios'

type errorObjectType = AxiosError | unknown

export const parseAxiosError = (error: errorObjectType) => {
  if (axios.isAxiosError(error)) {
    console.log('a', error)
    const { message, code, response } = error
    if (code === 'ERR_NETWORK') {
      return ['An error has occured in the network please try again']
    }
    const status = response?.status
    if (status === 500) {
      return ['An error has occured while submitting please try again']
    }
    if(response?.data?.errors) {
      return response?.data?.errors
    }
    if (typeof(response?.data)) {

    }
    return response?.data
  }   
  return ['An error has occured while submitting please try again']
}
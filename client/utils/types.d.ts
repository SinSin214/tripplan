export interface ThreadProps {
    id: string,
    imagePath: string,
    content: string,
    description: string,
    highlights: string[],
    title: string,
    author: string,
    createdAt: Date,
    rating: number
}

export interface IThreadOverviewType {
	id: string,
	title: string,
	rating: number,
	imagePath: string,
	content: string,
	author: string,
	createdAt: Date,
  description: string
}

export interface IUser {
  username: string,
  email: string
}

export interface WriteThreadType {
  title: string,
  content: string,
  images: string[]
}

export interface IResponse {
  data?: any[] | Object,
  message?: string | undefined
}

export interface IUserInfo {
  username: string,
  email: string,
  accessToken: string,
  refreshToken: string
}

export interface IProfile {
  username: string,
  email: string,
  isSigned: boolean
}
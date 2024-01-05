export interface PostProps {
    id: string,
    imagePath: string,
    content: string,
    description: string,
    highlights: string[],
    title: string,
    createdBy: string,
    createdAt: Date,
    rating: number
}
export interface IUser {
  username: string,
  email: string
}

export interface WritePostType {
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
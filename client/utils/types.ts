export interface PostProps {
    id: string,
    image_path: string,
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
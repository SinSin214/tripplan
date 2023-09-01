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
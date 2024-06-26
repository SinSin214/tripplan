export interface ThreadProps {
    id: string,
    imagePath: string,
    content: string,
    description: string,
    highlights: string[],
    title: string,
    creatorUsername: string,
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

export interface IProfile {
  username: string,
  email: string,
  displayName: string,
  isSigned: boolean
}
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
	creatorUsername: string,
	createdAt: Date,
  description: string
}

export interface IUser {
  username: string,
  email: string
}

export interface IProfile {
  username: string,
  email: string,
  displayName: string,
  bio: string,
  avatarPath: string,
  roleId: string
}
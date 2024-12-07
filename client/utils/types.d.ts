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
	upvote: number,
  downvote: number,
	imagePath: string,
	creator: {
    displayName: string
  },
	createdAt: Date,
  description: string,
  bookmarked: boolean
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
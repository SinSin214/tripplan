export interface PostProps {
    id: string,
    image_path: string,
    content: string,
    description: string,
    highlights: string[],
    title: string,
    createdBy: string,
    createdAt: number,
    rating: number
  }
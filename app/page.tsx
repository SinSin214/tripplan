import Image from 'next/image';

export default function Home() {
  return (
    <Image
      src="/wallpaper.jpg"
      alt="Picture of the author"
      width="0"
      height="0"
      sizes="100vw"
      className="w-full h-auto"
    />
  )
}

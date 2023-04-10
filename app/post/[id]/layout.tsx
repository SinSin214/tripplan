export default function PostDetailLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
      <main>
          <main className="main">
            {children}
          </main>
      </main>
  )
}

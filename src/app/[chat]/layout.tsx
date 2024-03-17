
export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
      <section className="bg-chat_background bg-no-repeat bg-cover">
        {children}
      </section>
  )
}
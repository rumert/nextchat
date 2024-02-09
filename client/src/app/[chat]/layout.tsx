
export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
      <section className="bg-[url('/chat-background.svg')] bg-no-repeat bg-cover">
        {children}
      </section>
  )
}
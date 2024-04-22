import Image from 'next/image'
import AuthForm from './_components/AuthForm'

export default function auth() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-primary-foreground lg:flex h-screen w-full items-center justify-center flex-col">
        <Image
          src="/person.png"
          alt="Image"
          width="1920"
          height="1080"
          className="w-1/2 h-1/2 object-scale-down"
        />
        <h1 className="text-4xl font-thin">Escalas AD V1</h1>
      </div>
      <div className="flex items-center justify-center p-4">
        <AuthForm />
      </div>
    </div>
  )
}

import { SubmitButton } from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import { addFriend } from "../../lib/firebase/firestore";
import { Input } from "@/components/ui/input";
import { User } from "firebase/auth";

interface Props {
  initialUser: User
  message: string
}

export default async function UserHomepage({ initialUser, message }: Props) {
  const currentUserName = initialUser.displayName

  async function handleAddFriend(formData: FormData) {
    "use server"
    const friendName = formData.get("friendName") as string;
    if (friendName.trim() != '' && currentUserName != friendName) {
      let chatDocId = null;
      let redirectPath: string;
      try {
        chatDocId = await addFriend(initialUser.uid, friendName)
        redirectPath = `/${chatDocId}`
      } catch (err: any) {
        console.error( err );
        redirectPath = `/?message=${err.message}`
      } finally {
        return redirect(redirectPath!);
      }
    }
  }

  return (
  <div className="h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto flex flex-col justify-center items-center">        

    <form action={handleAddFriend} className="flex w-full max-w-sm items-center space-x-2 mb-4">
      <Input 
        type="text" 
        name="friendName"
        placeholder="Username"
        required
      />
      <SubmitButton
        pendingText="Please Wait..."
        className='text-base'
      >
        Add your friend
      </SubmitButton>                  
    </form>   

    {message && (
      <p>
        {message}
      </p>
    )} 

  </div>   
  )
}
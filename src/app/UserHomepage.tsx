
import { SubmitButton } from "@/components/SubmitButton";
import { redirect } from "next/navigation";
import { addFriend } from "../../lib/firebase/firestore";

export default async function UserHomepage({ initialUser, message }: any) {
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
  <div className="h-[calc(100vh-84px)] md:h-screen md:w-[calc(100vw-92px)] md:ml-auto bg-[url('/chat-background.svg')] bg-no-repeat bg-cover flex flex-col">        
                        
    <form className="flex-grow flex flex-col items-center justify-center gap-2 drop-shadow-4xl">
      <input 
        type="text" 
        className='w-32'
        name="friendName"
        placeholder="Type your friend's name"
        required
      /> 
      <SubmitButton
        formAction={handleAddFriend}
        className="px-1 rounded-xl"
        pendingText="Adding..."
      >
        Add a new friend
      </SubmitButton>         
      {message && (
        <p>
          {message}
        </p>
      )}                
    </form>        
  </div>   
  )
}

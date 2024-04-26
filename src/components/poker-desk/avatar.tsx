import { User } from "@/types"

type Props = {
  user: User;
  showCards: boolean;
  vote?: number;
}

function Avatar({ user, vote, showCards }: Props) {
  return (
    <div key={user?.id} className="w-fit mx-auto">
      <span className="text-gray-300">{user?.name?.split(' ')?.[0] || user?.name}</span>
      <div data-hasVote={vote !== undefined} className="bg-gray-200 rounded-full size-10 mt-1 flex justify-center align-center data-[hasVote=true]:bg-primary-300">
        {showCards && <span className="m-auto text-slate-800 text-xl font-medium">{vote || '?'}</span>}
      </div>
    </div>
  )
}

export default Avatar

import {
  getAllPostsForHome,
  getAllHomeData,
  getAllSpeakerPosts,
  getAllPartnerPosts,
} from "../lib/api";

// export default function RedBanner({
//   allHomeData,
//   allSpeakerPosts,
//   allPartnerPosts,
// })
export default function RedBanner({
  getAllHomeData,
  getAllSpeakerPosts,
  getAllPartnerPosts,
}) {
  return (
    <div className="w-full  bg-red-600 text-center py-4 text-white overflow-hidden">
      <div>
        <p className="text-2xl font-semibold">Since 2011 more than</p>
      </div>
      <div className="flex justify-evenly pt-5 ">
        <div className="px-5">
          <p>{getAllHomeData}</p>
          <p>Attendees</p>
        </div>
        <div className="px-5">
          <p>{getAllSpeakerPosts}</p>
          <p>Events</p>
        </div>
        <div className="px-5">
          <p>{getAllPartnerPosts}</p>
          <p>Users reached</p>
        </div>
      </div>
    </div>
  );
}

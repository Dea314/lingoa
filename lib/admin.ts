import { auth } from "@clerk/nextjs";

const adminIds = [
  "user_2fQ5zbK4oW8jgGUMjvrW4fBuu9G",
  "user_2fQ6fQHzT5FiQFiTFadIFGua37j",
  "user_2epb70tGytaSdRGwN3Ejset4KMh",
  "user_2ejeyhy1DncyEzUhjHsGtoeDCZU",
];

export const getIsAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};

// Auth
export const loginApi= `/users/login`;
export const loginSocial = `/users/login-fb`;

export const registerApi= `/users`
export const putAvartar= `/avatars`
export const createCoures= `/courses`
export const deleteCoures= `/courses`
export const getCoursesPrivate= `/users/get-courses-latest`
export const getDetailCourses= `/courses`
export const updateContentOnCourse= `/courses`
//topics
export const getTopic= `/topics`

//history
export const setHistory= `/histories/update-history`;
// export const vocabularyHistory = id => `histories/vocabulary-history/${id}`
//challenge
export const getChallenge= `challenge`
export const updateHightMark = '/users/hight-mark';

// getme
export const getMe = '/users/me';
export const getFriends = '/users/friends';
export const addFriend = '/users/add-friend';
// leader board
export const getBoard = '/users/hight-mark?challenge=true&page=0&limit=5';

// noti
export const getListNoti = '/notify/user?page=0&limit=5';
export const updateSeenNotify = '/notify/updateSeen';

// Game
export const inviteFriend = '/game/invite-friend';
export const acceptGame = '/game/accept';
export const getQuestions = '/challenge/random';

// Course
export const getCoursePublic = `/courses/public`;
export const getListCurrent = '/histories/current-history';
export const shareCourse = '/courses/share';
export const acceptCourse = '/courses/accept';

import firebase from '../config/firebase';

const database = firebase.database().ref();

export async function getPostEvolution(evolutionUid) {
  const likesRef = database.child('likes/').child(evolutionUid);

  const likesSnapshot = await likesRef.once('value');

  const likes = likesSnapshot.val();

  return likes ? Object.keys(likes) : [];
}

export async function getUser(uid) {
  const userRef = database.child('users').child(uid);

  const userSnapshot = await userRef.once('value');

  const user = userSnapshot.val();

  return { ...user, uid };
}

export async function getRelationshipUids(location, uid) {
  const ref = database.child(location).child(uid);

  const snapshot = await ref.once('value');

  const users = snapshot.val();

  if (users) {
    return await Promise.all(Object.keys(users));
  }

  return new Promise((resolve) => resolve([]));
}

export async function getFollowedUsersUids(uid) {
  return await getRelationshipUids('following/', uid);
}

export async function getFollowersUsersUids(uid) {
  return await getRelationshipUids('followers/', uid);
}

export async function getUsersDataFromUids(usersList) {
  const mapUser = async (userUid) => await getUser(userUid);

  return await Promise.all(usersList.map(mapUser));
}

export async function getFolloweds(userUid) {
  const followedUsers = await getFollowedUsersUids(userUid);

  return await getUsersDataFromUids(followedUsers);
}

export async function getFollowers(userUid) {
  const followerUsers = await getFollowersUsersUids(userUid);

  return await getUsersDataFromUids(followerUsers);
}

async function mapEvolutions([timestamp, evolution]) {
  const likees = await getPostEvolution(timestamp);

  return {
    ...evolution,
    uid: timestamp,
    timestamp,
    likees
  };
}

export async function getUserEvolutions(userUid) {
  const evolutionRef = database.child('evolution/').child(userUid);

  const evolutionsSnapshot = await evolutionRef.orderByKey().once('value');

  const evolutions = evolutionsSnapshot.val();

  if (evolutions) {
    const evolutionsEntries = Object.entries(evolutions);

    return await Promise.all(evolutionsEntries.map(mapEvolutions));
  }

  return [];
}

export async function searchForUsers(term) {
  try {
    const usersRef = database.child('users/');

    const query = usersRef.orderByChild('name')
      .startAt(term)
      .endAt(`${term}\uf8ff`);

    const usersSnapshot = await query.once('value');

    const users = usersSnapshot.val();

    if (users) {
      const userEntries = Object.entries(users);

      return userEntries.map(([uid, user]) => ({ ...user, uid }));
    }

    return [];
  } catch (error) {
    return [];
  }
}
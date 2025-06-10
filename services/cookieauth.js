const sessionIdToMap= new Map();

function setUserCookie(user, id) {
    sessionIdToMap.set(user, id);
}

function getUserCookie(id) {
    return sessionIdToMap.get(id);
}

export default {setUserCookie, getUserCookie};
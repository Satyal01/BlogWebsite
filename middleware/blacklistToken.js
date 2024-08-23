const blackList = {};



function inBlackList(token){
    if(blackList[token]) return true;
    return false;
}

function blackListAdd(token){
    blackList[token] = token
}

module.exports = {
    blackListAdd,
    inBlackList
}
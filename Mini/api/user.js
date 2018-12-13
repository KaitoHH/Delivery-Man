const fetch = require('./fetch')
const URL = require('../utils/config').serverURL
const defaultNickName = 'WeChatUser'
function fetchUserByOpenId(openId) {
    return fetch(URL, 'user', {
        openid: openId
    })
}

function updateUserNickName(id, nickname) {
    return new Promise((resolve, reject) => {
        fetch(URL, `user/${id}/`, {})
            .then(res => {
                const u = res.data
                if (u.nickname !== nickname) {
                    fetch(URL, `user/${id}/`, {
                        nickname: nickname,
                        openid: u.openid
                    }, 'put').then(res => {
                        resolve(res)
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    resolve(res)
                }
            }).catch(e => {
                reject(e)
            })
    })
}

function fetchUserOrCreateNew(openId) {
    return new Promise((resolve, reject) => {
        const fetchUserFunc = fetchUserByOpenId(openId)
        fetchUserFunc.then(res => {
            const users = res.data
            if(users.length === 0) {
                fetch(URL, 'user/', {
                    openid: openId,
                    nickname: defaultNickName
                }, 'POST').then(res => {
                    resolve(res.data)
                }).catch(e => {
                    console.log(e)
                    reject(e)
                })
            } else {
                resolve(users[0])
            }
        }).catch(e => {
            reject(e)
        })
    })
    
}


module.exports = {
    fetchUserOrCreateNew,
    updateUserNickName
}
const userAuth = 'https://x8ki-letl-twmt.n7.xano.io/api:-QKB4H52'

export function getCookie(cookieName) {
    const name = `${cookieName}=`
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArr = decodedCookie.split(';')
    for(let i = 0; i < cookieArr.length; i++){
        let currentCookie = cookieArr[i]
        while (cookieName.charAt(0) === ' ') {
            currentCookie = currentCookie.substring(1)
        }
        if(currentCookie.indexOf(cookieName) === 0){
            return currentCookie.substring(cookieName.length, currentCookie.length)
        }
    }
    return ""
}

export function setCookie(cookieName, cookieValue, exdays) {
    const date = new Date()
    date.setTime(date.getTime() + (exdays*24*60*60*1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${cookieName}=${cookieValue};${expires};path=/`
}

export async function getVans(id) {
    const url = id ? `/api/vans/${id}` : "/api/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

export async function loginUser(creds) {
    let postOptions = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
    }
    const res = await fetch(`${userAuth}/auth/login`, postOptions)
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }
    console.log(data.authToken)
    setCookie('login', data.authToken, 7)
}

export async function checkAuth() {
    let token = getCookie('login')
    let options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    console.log(token)

    const res = await fetch(`${userAuth}/auth/me`, options)
    const data = await res.json()
    if(data.id){
        return {
            loggedIn: true,
            id: data.id,
            name: data.name,
            email: data.email
        }
    } else {
        return {
            loggedIn: false
        }
    }
}
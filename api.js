const userAuth = 'https://x8ki-letl-twmt.n7.xano.io/api:-QKB4H52'
const vanApi = 'https://x8ki-letl-twmt.n7.xano.io/api:qP2FTqNA'
const hostApi = 'https://x8ki-letl-twmt.n7.xano.io/api:M9VwSGvP'

export async function getCookie(cookieName) {
    const name = `${cookieName}=`
    const decodedCookie = await decodeURIComponent(document.cookie)
    const cookieArr = decodedCookie.split(';')

    for(let i = 0; i < cookieArr.length; i++){
        let currentCookie = cookieArr[i]
        while (cookieName.charAt(0) === ' ') {
            currentCookie = currentCookie.substring(1)
        }
        if(currentCookie.indexOf(cookieName) === 0){
            return currentCookie.substring(name.length, currentCookie.length)
        }
    }
}

export function setCookie(cookieName, cookieValue, exdays) {
    const date = new Date()
    date.setTime(date.getTime() + (exdays*24*60*60*1000))
    const expires = `expires=${date.toUTCString()}`
    document.cookie = `${cookieName}=${cookieValue};SameSite=Lax;secure;${expires};path=/`
}

export async function getVans(id) {
    const url = id ? `${vanApi}/vans/${id}` : `${vanApi}/vans`
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
}

export async function getHostVans(id) {
    const token = await getCookie('login')
    console.log(token)
    const url = id ? `${hostApi}/host/vans/${id}` : `${hostApi}/host/vans`
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }

    const res = await fetch(url, options)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data
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
    if(token){
        const res = await fetch(`${userAuth}/auth/me`, options)
        const data = await res.json()
    
        if(data.id) {
            return {
                loggedIn: true,
                user: data.name,
                userId: data.id,
                userEmail: data.email
            }
        }
    } else {
        return {
            loggedIn: false
        }
    }
}
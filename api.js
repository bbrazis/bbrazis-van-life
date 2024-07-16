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
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
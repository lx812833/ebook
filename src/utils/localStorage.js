import Storage from "web-storage-cache"

const localStorage = new Storage()

// 往缓存中插入数据。
export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}

// 根据key获取缓存中未超时数据
export function getLocalStorage(key) {
    return localStorage.get(key)
}

// 根据key删除缓存中的值。
export function removeLocalStorage(key) {
    return localStorage.delete(key)
}

// 清空缓存中全部的值
export function clearLocalStorage() {
    return localStorage.clear()
}


// 每一本书的基础信息都是一样的，但存储对象不一样
export function setBookObject(fileName, key, value) {
    let book = getLocalStorage(`${fileName}-info`)
    if (!book) {
        book = {}
    }
    book[key] = value
    setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
    let book = getLocalStorage(`${fileName}-info`)
    if (book) {
        return book[key]
    } else {
        return null
    }
}

// 设置字体存储与获取
export function getFontFamily(fileName) {
    return getBookObject(fileName, 'fontFamily')
}

export function saveFontFamily(fileName, font) {
    return setBookObject(fileName, 'fontFamily', font)
}


export function getLocale() {
    return getLocalStorage('locale')
}

export function saveLocale(locale) {
    return setLocalStorage('locale', locale)
}

export function getLocation(fileName) {
    return getBookObject(fileName, 'location')
}

export function saveLocation(fileName, location) {
    setBookObject(fileName, 'location', location)
}

export function getBookmark(fileName) {
    return getBookObject(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
    setBookObject(fileName, 'bookmark', bookmark)
}

export function getReadTime(fileName) {
    return getBookObject(fileName, 'time')
}

export function saveReadTime(fileName, theme) {
    setBookObject(fileName, 'time', theme)
}

export function getProgress(fileName) {
    return getBookObject(fileName, 'progress')
}

export function saveProgress(fileName, progress) {
    setBookObject(fileName, 'progress', progress)
}

export function getNavigation(fileName) {
    return getBookObject(fileName, 'navigation')
}

export function saveNavigation(fileName, navigation) {
    setBookObject(fileName, 'navigation', navigation)
}

export function getMetadata(fileName) {
    return getBookObject(fileName, 'metadata')
}

export function saveMetadata(fileName, metadata) {
    setBookObject(fileName, 'metadata', metadata)
}

export function getCover(fileName) {
    return getBookObject(fileName, 'cover')
}

export function saveCover(fileName, cover) {
    setBookObject(fileName, 'cover', cover)
}


export function getTheme(fileName) {
    return getBookObject(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
    setBookObject(fileName, 'theme', theme)
}

// 保存设置字体大小
export function getFontSize(fileName) {
    return getBookObject(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
    setBookObject(fileName, 'fontSize', fontSize)
}
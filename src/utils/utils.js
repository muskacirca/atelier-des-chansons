import _ from 'lodash'

export function removeClassInBodyIfNeeded(className) {

    let bodyClass = document.body.className;
    bodyClass = bodyClass.indexOf(className) != -1
        ? _.replace(bodyClass, className, '')
        : "";

    document.body.className = bodyClass;
}

export function toggleClassInBody(className) {

    let bodyClass = document.body.className;
    bodyClass = bodyClass.indexOf(className) == -1
        ? addSafely(bodyClass, className)
        : replaceSafely(bodyClass, className)

    document.body.className = bodyClass;
}

function addSafely(bodyClass, className) {
    return bodyClass.length > 0 
        ? " " + className
        : className
}


function replaceSafely(bodyClass, className) {
    let str = (bodyClass === className)
        ? className
        : " " + className

    return _.replace(bodyClass, str, '')
}
export function requestPermissions() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('permission granted');
            } else {
                console.log('permission declined');
            }
        });
    }
}

/**
 *
 * @param {string} title
 * @param {string} message
 */
export function triggerNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {body: message});
    }
}
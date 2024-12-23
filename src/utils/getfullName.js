export default function getfullName(obj) {
    const { first_name, middle_name, last_name } = obj || {}
    return `${first_name || ''}${middle_name ? ` ${middle_name}` : ''} ${last_name || ''}`
}

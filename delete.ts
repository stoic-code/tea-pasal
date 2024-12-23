/**
 *
 * @param obj   eg: {page:1, size:10}
 * @returns string   eg: page=1&size=10
 */

const createSearchParms = (obj: { [key: string]: string | number | null | undefined }) => {
    let params = new URLSearchParams('')
    Object.keys(obj).forEach(el => {
        if (obj[el]) {
            params.set(el, obj[el] as string)
        }
    })
    return params.toString()
}

console.log(createSearchParms({ page: 1, size: 2 }))

/**
 *
 * @param base string eg: https://google.com
 * @param obj object  eg: {page:1,size:2}
 * @returns string    eg: https://google.com?page=1&size=2
 */

const appendSearchParams = (base: string, obj: { [key: string]: string | number | null | undefined }) => {
    let output = base + '?'
    return output + createSearchParms(obj)
}

/* 
// Get a new searchParams string by merging the current
    const createQueryString = useCallback(
        (name?: string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if(name && value){
                params.set(name, value)
            }
            return params.toString()
        },
        [searchParams]
    )

*/

// console.log(appendSearchParams('', { cid: null }))

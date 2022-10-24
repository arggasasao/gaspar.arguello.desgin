export const load = async ({ page, params }) => {
    console.log("+page: projects", page)
    console.log("+page: projects", params)
    // export const load = async ({ fetch }) => {
    //     const fetchResume = async () => {
    //         const res = await fetch("resume.json")
    //         const data = await res.json()
    //         console.log("+page, project:",data)
    //         return data
    //     }
    //     return fetchResume(); 
    //     // {

    //     // }
    return {
        propPage: "page"
    }
}

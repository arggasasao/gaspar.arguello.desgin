export const load = async ({ fetch }) => {
    const fetchResume = async () => {
        const res = await fetch("es.resume.json")
        const data = await res.json()
        // console.log("+page, home:",data)
        return data
    }
    return fetchResume(); 
}



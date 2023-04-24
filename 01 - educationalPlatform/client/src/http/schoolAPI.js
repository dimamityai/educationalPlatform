import {$authHost, $host} from "./index";

export const createSchool = async (school) =>{
    const {data} = await $authHost.post('api/school', school)
    return data
}

export const fetchSchools = async () =>{
    const {data} = await $host.get('api/school')
    return data
}

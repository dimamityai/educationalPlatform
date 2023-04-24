import {$authHost, $host} from "./index";


export const createTest = async (test) =>{
    const {data} = await $authHost.post('api/test', test)
    return data
}

export const fetchTests = async (testTypeId, schoolId, page, limit = 5) =>{
    console.log(testTypeId)
    const {data} = await $host.get('api/test', {params: {
            testTypeId, schoolId, page, limit
        }})
    return data
}
export const fetchOneTest = async (id) =>{
    const {data} = await $host.get('api/test/' + id)
    return data
}

export const createType = async (type) =>{
    const {data} = await $authHost.post('api/testtype', type)
    return data
}

export const fetchTypes = async () =>{
    const {data} = await $host.get('api/testtype')
    return data
}

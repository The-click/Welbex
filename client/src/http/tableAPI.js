
import { $host } from "./index"


export const getAllData = async (page, limit=5) => {
    const {data} = await $host.get('api/table', {params:{
        page, limit
    }})
    return data;
}
export const getFilterData = async (column, filter, text, page, limit=5) => {
    const {data} = await $host.get('api/table', {params:{
        page, limit, column, filter, text,

    }})
    return data;
}

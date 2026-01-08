import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject)
}

const remove = (personObject) => {
    return axios.delete(`${baseUrl}/${personObject.id}`)
}

const update = (personId, personObject) => {
    return axios.put(`${baseUrl}/${personId}`, personObject)
}

export default { getAll, create, remove, update }
import axios from 'axios'

function api() {
    return axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}`
    })
}

export const getData = async (url, setPlotData, setLastHumidity) => {
    await api().get(url).then((res) => {
        setPlotData(res.data.data)
        setLastHumidity(res.data.lastHumidity)
    })
}

export const getLastData = async (url, setData) => {
    await api().get(url).then((res) => setData(res.data))
}

export const getSectors = async (url, setData) => {
    await api().get(url).then((res) => setData(res.data.sectors))
}
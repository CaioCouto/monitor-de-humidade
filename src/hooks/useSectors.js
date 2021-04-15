import { useState } from 'react'

function useSectors(context) {
    const estadoInicial = context.sectors
    const [ sectors, setSectors ] = useState(estadoInicial)

    return [ sectors, setSectors ]
}

export default useSectors
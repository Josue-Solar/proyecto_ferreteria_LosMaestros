import { useEffect, useState } from 'react'
import { FavoritosContext } from './FavoritosContext'

const FAVORITOS_KEY = 'favoritosFerreteria'

function leerFavoritos() {
  try {
    const datos = localStorage.getItem(FAVORITOS_KEY)
    return datos ? JSON.parse(datos) : []
  } catch {
    return []
  }
}



function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(leerFavoritos)

  //cada vez que hay cambios en la lista esta se guarda en localStorage (que ya usamo en la primera evaluacion1!1!!!)
  useEffect(() => {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos))
  }, [favoritos])

  const esFavorito = (id) => favoritos.includes(id)

  const alternarFavorito = (id) => {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favorito) => favorito !== id)
        : [...actuales, id]
    )
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, esFavorito, alternarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export default FavoritosProvider
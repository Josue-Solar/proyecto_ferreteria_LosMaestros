import { useLayoutEffect, useState } from 'react'
import { TemaContext } from './TemaContext'

const TEMA_KEY = 'temaFerreteria'




function leerTema() {
  try {
    return localStorage.getItem(TEMA_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function TemaProvider({ children }) {
  const [tema, setTema] = useState(leerTema)

  //aplica el tema a toda la pag y lo guarda en localstorage
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', tema)
    localStorage.setItem(TEMA_KEY, tema)
  }, [tema])

  const alternarTema = () => {
    setTema((actual) => (actual === 'light' ? 'dark' : 'light'))
  }

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  )
}

export default TemaProvider
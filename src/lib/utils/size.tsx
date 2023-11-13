'use client'

import { useContext, createContext, useEffect, useState } from 'react'

const SizeContext = createContext({})

export function SizeContextProvider({ children }: { children: React.ReactNode }) {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const isMobile = width <= 1100

	const handleWindowResize = () => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}

	useEffect(() => {
		// component is mounted and window is available
		handleWindowResize()
		window.addEventListener('resize', handleWindowResize)
		// unsubscribe from the event on component unmount
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return (
        <SizeContext.Provider value={{ width, height, isMobile }}>
            {children}
        </SizeContext.Provider>
    )
}

export function displaySize() {
    return useContext(SizeContext)
}

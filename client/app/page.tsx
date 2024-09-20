'use client'
import React, { useEffect, useRef, useState } from 'react'
import { getConnection, findVol, addVol, delVol } from './actions'
import { Volunteer } from '@/lib/Vol'


const Main = () => {
    const firstLoad = useRef<boolean>(false)
    const [volInput, setInput] = useState<any>({
        name: '', age: ''
    });


    const [vols, setVols] = useState<Volunteer[]>([])
    useEffect(() => {
        if (!firstLoad.current) {
            const fetchData = async () => {
                console.log(await getConnection())
                const data = await findVol()
                setVols(data)
            }
            fetchData()
            firstLoad.current = true
        }
    })


    function handleChange(e: any) {
        if (e.target.id === "name") {
            setInput({name: e.target.value, age: volInput.age, major: volInput.major, gpa: volInput.gpa})
        } else {
            setInput({name: volInput.name, age: e.target.value, major: volInput.major, gpa: volInput.gpa})
        }
    }


    return (
        <>
            <div className="flex flex-row bg-slate-900">
                <div className="m-auto w-[20vw] mx-[10vw]">
                    <h1 className="text-3xl p-5 w-fit">Volunteers <span className="text-gray-400 text-lg">(scroll)</span></h1>
                    <div className="h-[80vh] overflow-scroll bg-black rounded-lg border-[2px] border-white scrollbar-none">
                        {vols.map((vol) => {return (
                            <div key={JSON.stringify(vol)} className="p-5 border-gray-700 border-[2px] m-5 rounded-xl">
                                <p className="text-2xl">{vol.name}</p>
                                <p className="text-gray-400">Age: {vol.age ? vol.age.toString() : ''}</p>
                                <p className="text-gray-400">Date: {new Date(vol.createdAt).toLocaleString('en-US')}</p>
                            </div>
                        )})}
                    </div>
                </div>
                <div className="w-[50vw] h-[100vh] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl p-5 w-fit">User Input</h1>
                        <div className="flex">
                            <input id="name" value={volInput.name} onChange={handleChange} placeholder="Name" className="block m-5 p-2 rounded-md text-black"></input>
                            <input id="age" value={volInput.age} onChange={handleChange} placeholder="Age" className="block m-5 p-2 rounded-md text-black"></input>
                        </div>
                        <div className="flex justify-around gap-5">
                            <button onClick={() => {
                                var temp = volInput
                                temp.age = parseFloat(temp.age)
                                addVol(temp)
                                const refresh = async () => {
                                    setVols([])
                                    setVols(await findVol())
                                }
                                refresh()
                            }} className="bg-green-500 text-white p-2 w-[75px] rounded-lg">Add</button>
                            <button onClick={() => {
                                delVol({name: volInput.name})
                                const refresh = async () => {
                                    setVols([])
                                    setVols(await findVol())
                                }
                                refresh()
                            }} className="bg-red-500 text-white p-2 w-[75px] rounded-lg">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main

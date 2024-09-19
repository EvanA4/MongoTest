'use client'
import { useEffect, useState } from "react";
import { addVolunteer, readVolunteer, getVolunteers, deleteVolunteer } from "./actions";


interface Student {
    name: string,
    age: number,
    major: string,
    gpa: number
}


export default function Main() {
    const [volInput, setInput] = useState<any>({
        name: '', age: '', major: '', gpa: ''
    });


    const [vols, setVols] = useState<Student[]>([])
    useEffect(() => {
        if (vols.length === 0) {
            const fetchData = async () => {
                const data = await getVolunteers()
                setVols(data)
            }
            fetchData()
        }
    })


    function handleChange(e: any) {
        if (e.target.id === "name") {
            setInput({name: e.target.value, age: volInput.age, major: volInput.major, gpa: volInput.gpa})
        } else if (e.target.id === "age") {
            setInput({name: volInput.name, age: e.target.value, major: volInput.major, gpa: volInput.gpa})
        } else if (e.target.id === "major") {
            setInput({name: volInput.name, age: volInput.age, major: e.target.value, gpa: volInput.gpa})
        } else {
            setInput({name: volInput.name, age: volInput.age, major: volInput.major, gpa: e.target.value})
        }
    }


    return (
        <>
            <div className="flex flex-row bg-slate-900">
                <div className="m-auto w-[20vw] mx-[10vw]">
                    <h1 className="text-3xl p-5 w-fit">Volunteers</h1>
                    <div className="h-[80vh] overflow-scroll bg-black rounded-lg border-[2px] border-white">
                        {vols.map((student) => {return (
                            <div key={JSON.stringify(student)} className="p-5 border-gray-700 border-[2px] m-5 rounded-xl">
                                <p className="text-2xl">{student.name}</p>
                                <p className="text-gray-400">{student.major}</p>
                                <p className="text-gray-400">Age: {student.age}</p>
                                <p className="text-gray-400">GPA: {student.gpa}</p>
                            </div>
                        )})}
                    </div>
                </div>
                <div className="w-[50vw] h-[100vh] flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl p-5 w-fit">User Input</h1>
                        <div className="flex">
                            <input id="name" value={volInput.name} onChange={handleChange} placeholder="Name" className="block m-5 p-2 rounded-md text-black"></input>
                            <input id="major" value={volInput.major} onChange={handleChange} placeholder="Major" className="block m-5 p-2 rounded-md text-black"></input>
                        </div>
                        <div className="flex">
                            <input id="age" value={volInput.age} onChange={handleChange} placeholder="Age" className="block m-5 p-2 rounded-md text-black"></input>
                            <input id="gpa" value={volInput.gpa} onChange={handleChange} placeholder="GPA" className="block m-5 p-2 rounded-md text-black"></input>
                        </div>
                        <div className="flex justify-around gap-5">
                            <button onClick={() => {
                                var temp = volInput
                                temp.age = parseFloat(temp.age)
                                temp.gpa = parseFloat(temp.gpa)
                                addVolunteer(temp)
                                const refresh = async () => {
                                    setVols([])
                                    setVols(await getVolunteers())
                                }
                                refresh()
                            }} className="bg-green-500 text-white p-2 w-[75px] rounded-lg">Add</button>
                            <button onClick={() => {
                                deleteVolunteer(volInput.name)
                                const refresh = async () => {
                                    setVols([])
                                    setVols(await getVolunteers())
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
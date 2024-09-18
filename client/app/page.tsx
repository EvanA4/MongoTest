import { addVolunteer, readVolunteer, getVolunteers } from "./actions";


interface Student {
    name: string,
    age: number,
    major: string,
    gpa: number
}


export default async function Main() {
    var newStudent = {
        name: "Jack Knife",
        age: 22,
        major: "Mechanical Engineering",
        gpa: 3.47
    }
    // await addVolunteer(newStudent)
    // const readStudent = await readVolunteer("Jack Knife")
    // console.log(await getVolunteers())
    const volunteers = await getVolunteers()
    return (
        <>
            <h1 className="text-3xl p-5">All Volunteers</h1>
            <div className="w-[40vw] mx-auto mb-[50px]">
                {volunteers.map(student => {return (
                    <div className="p-5 border-white border-[2px] m-5 rounded-xl">
                        <h2>{student.name}</h2>
                        <p>{student.age}</p>
                        <p>{student.major}</p>
                        <p>{student.gpa}</p>
                    </div>
                )})}
            </div>
        </>
    )
}
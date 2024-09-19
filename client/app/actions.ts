"use server";

import client from "@/lib/mongodb";

// export async function testDatabaseConnection() {
//   let isConnected = false;
//   try {
//     const mongoClient = await client.connect();
//     // Send a ping to confirm a successful connection
//     await mongoClient.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     ); // because this is a server action, the console.log will be outputted to your terminal not in the browser
//     return !isConnected;
//   } catch (e) {
//     console.error(e);
//     return isConnected;
//   }
// }


interface Student {
    name: string,
    age: number,
    major: string,
    gpa: number
}


export async function addVolunteer(student: Student): Promise<boolean> {
	try {
		const mongoClient = await client.connect()
		const col = mongoClient.db("TestingMongo").collection("volunteers")
		col.insertOne(student)
		return true
	} catch (e) {
		console.error(e);
		return false
	}
}


export async function readVolunteer(searchName: string): Promise<Student> {
	try {
		const mongoClient = await client.connect()
		const col = mongoClient.db("TestingMongo").collection("volunteers")
		const student: any = await col.findOne({name: searchName})
		return student;
	} catch (e) {
		console.error(e);
		const student: Student = {
			name: "",
			age: -1,
			major: "",
			gpa: -1
		}
		return student
	}
}


export async function getVolunteers(): Promise<Student[]> {
	try {
		const mongoClient = await client.connect()
		const col = mongoClient.db("TestingMongo").collection("volunteers")
		const raw: any = await col.find()
		return await raw.toArray()
	} catch (e) {
		console.error(e);
		return []
	}
}


export async function deleteVolunteer(searchName: string): Promise<boolean> {
	try {
		const mongoClient = await client.connect()
		const col = mongoClient.db("TestingMongo").collection("volunteers")
		col.deleteOne({name: searchName})
		return true
	} catch (e) {
		console.error(e);
		return false
	}
}
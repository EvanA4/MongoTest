'use server'
import { volModel, Volunteer } from '@/lib/Vol'
import { isConnected, ConnectStat } from '@/lib/mymg'


export async function getConnection(): Promise<ConnectStat> {
    return isConnected
}


export async function findVol(filter?: any): Promise<Volunteer[]> {
    if (filter)
        return JSON.parse(JSON.stringify(await volModel.find(filter)))
    return JSON.parse(JSON.stringify(await volModel.find()))
}


export async function addVol(toAdd: any): Promise<String> {
    try {
        await volModel.create(toAdd)
        return "Added vol successfully!"
    } catch (e: any) {
        return e.message
    }
}


export async function delVol(toDel?: any): Promise<String> {
    try {
        if (toDel)
            await volModel.deleteOne(toDel)
        else
            await volModel.deleteMany()
        return "Deleted vol successfully!"
    } catch (e: any) {
        return e.message
    }
}
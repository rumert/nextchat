"use server"
import { cookies } from "next/headers";

export async function setCookie(name: any, value: any) {
    cookies().set(name, value)
}

export async function removeCookie(name: any) {
    cookies().delete(name)
}
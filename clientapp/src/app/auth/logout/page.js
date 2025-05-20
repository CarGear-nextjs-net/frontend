'use client'
import {redirect} from "next/navigation";
import axios from "axios";

export default async function LogoutPage(){
    try{
        await axios.delete('/api/session');
    }catch(e){

    }finally {
        redirect("/auth/login");
    }
}
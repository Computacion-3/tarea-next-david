'use client';

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";


export function useAuth(){

    const dispatch = useAppDispatch();

    const errorMessage = useAppSelector((state) => state.errorMessage);    

    return{

    };

}
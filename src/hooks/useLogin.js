import React from 'react'
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import { login } from '../lib/api';

const useLogin = () => {

    const queryClient = useQueryClient();

 const {mutate, ispending , error} = useMutation({
   mutationFn: login,
       onSuccess: () =>  queryClient.invalidateQueries({queryKey:["authUser"]}), 
 });
 return {error:error ,ispending , loginMutation:mutate};
}

export default useLogin

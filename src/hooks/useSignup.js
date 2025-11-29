import React from 'react'
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import { signup } from '../lib/api';

const useSignup = () => {

    const queryClient = useQueryClient();
    
  const {mutate ,ispending , error} = useMutation({
      mutationFn: signup,
          onSuccess: () =>  queryClient.invalidateQueries({queryKey:["authUser"]}),
  
    });
    return {error:error ,ispending , signupMutation:mutate};
}

export default useSignup

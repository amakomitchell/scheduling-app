import { useMutation } from 'react-query'
import { createActivity, deleteActivity, editActivity } from './apis'
import { queryClient } from '../App'
import { Activity } from '../types/activity'

const onSuccess = () => {
    queryClient.refetchQueries(['ACTIVITIES'])
}

export const useCreateActivity = () => {
    return useMutation(createActivity, { onSuccess })
}

export const useUpdateActivity = () => {
    return useMutation(editActivity, { onSuccess })
}

export const useDeleteActivity = () => {
    return useMutation(deleteActivity, { onSuccess })
}
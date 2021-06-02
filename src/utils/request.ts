import axios from 'axios';

const adapter = axios.create({
  baseURL: 'https://trainerroad-tr-beta01-un1-as-api-02.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic dGVzdC10cmF2aXMtMDFhOjk4NzY1NA=='
  }
})

export const getWorkoutIds = async (): Promise<any> => {
  const response = await adapter.get('/v2/workouts')
  return response.data;
}

export const getWorkouts = async (ids: string): Promise<any> => {
  const response = await adapter.get(`/v2/workouts?ids=${ids}`)
  return response.data;
}
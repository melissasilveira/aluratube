import { createClient } from '@supabase/supabase-js'

const PROJECT_URL = 'https://keihnicjggnvwqhzehxh.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlaWhuaWNqZ2dudndxaHplaHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTYxNjIsImV4cCI6MTk4NDAzMjE2Mn0.Jo251vbRcd3qT_ig5hZKPK1ZoqCWeuLZk00QGJK8ww0'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from('video').select('*')
    },
  }
}

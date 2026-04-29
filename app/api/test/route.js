export async function GET(request) {
  return Response.json({
    success: true,
    message: 'API route funciona',
    timestamp: new Date().toISOString()
  })
}

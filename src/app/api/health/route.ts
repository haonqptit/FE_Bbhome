export function GET() {
  return Response.json(
    {
      status: "healthy",
      service: "fe-bbhome",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

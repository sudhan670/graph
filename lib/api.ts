export async function fetchGraphs() {
  const response = await fetch('http://localhost:3001/api/graphs');
  return response.json();
}

export async function createGraph(data: any) {
  const response = await fetch('http://localhost:3001/api/graphs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
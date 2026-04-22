export async function action({ request }) {
    const data = await request.json();

    // In a real app, you would send this to Telegram API here.
    // For now, we'll simulate a success.
    console.log("Mock sending to Telegram:", data);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

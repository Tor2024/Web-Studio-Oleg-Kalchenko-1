export const loader = () => {
    const content = `
User-agent: *
Allow: /
Sitemap: https://web-studio-oleg-kalchenko.com/sitemap.xml
  `;

    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        },
    });
};

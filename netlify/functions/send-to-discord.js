export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const webhook = process.env.DISCORD_WEBHOOK_URL;

    if (!webhook) {
      throw new Error("Webhook not configured");
    }

    const payload = {
      embeds: [
        {
          title: "📩 New ZYORA Enquiry",
          color: 0x2c2c2c,
          fields: [
            { name: "Name", value: data.name || "N/A", inline: true },
            { name: "Email", value: data.email || "N/A", inline: true },
            { name: "Phone", value: data.phone || "N/A", inline: true },
            { name: "Project Type", value: data.projectType || "N/A", inline: true },
            { name: "Budget", value: data.budget || "N/A", inline: true },
            { name: "Message", value: data.message || "N/A" }
          ],
          footer: { text: "ZYORA Website" },
          timestamp: new Date()
        }
      ]
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("Discord rejected request");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

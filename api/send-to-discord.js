export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    projectType,
    budget,
    message
  } = req.body;

  const webhookURL = "https://discord.com/api/webhooks/1451841287933132862/s7oC02_SmXRIDQC1-Bn-F6CraxiyVRWqtOhkJ9Ebn8OUWXiL_mNHMmEE2tT4pKNKiZWU";

  const text = `
📩 **New Contact Form Submission**
━━━━━━━━━━━━━━━━━━━
👤 **Name:** ${name}
📧 **Email:** ${email}
📱 **Phone:** ${phone || "Not provided"}
🏗 **Project Type:** ${projectType || "Not specified"}
💰 **Budget:** ${budget || "Not specified"}
📝 **Message:** 
${message}
━━━━━━━━━━━━━━━━━━━
  `;

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: text })
    });

    if (!response.ok) {
      throw new Error("Discord API error");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send to Discord" });
  }
}

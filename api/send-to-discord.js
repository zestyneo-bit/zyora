export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = "https://discord.com/api/webhooks/1451841287933132862/s7oC02_SmXRIDQC1-Bn-F6CraxiyVRWqtOhkJ9Ebn8OUWXiL_mNHMmEE2tT4pKNKiZWU";

  try {
    const { name, email, message } = req.body;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📩 **New Contact Form Submission**
**Name:** ${name}
**Email:** ${email}
**Message:** ${message}`
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed sending to Discord" });
  }
}

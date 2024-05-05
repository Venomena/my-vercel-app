const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const Groq = require('groq-sdk'); // Or the correct module name

app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({  // to support URL-encoded bodies
  extended: true
}));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

router.use(express.json());

router.post('/', async (req, res) => {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "mixtral-8x7b-32768"
        });

        let responseContent = chatCompletion.choices[0]?.message?.content || "No response";
        console.log("AI Response:", responseContent);

        const codeMatch = responseContent.match(/```python\n([\s\S]*?)\n```/);
        if (codeMatch) {
            const pythonCode = codeMatch[1];
            const scriptsDir = path.join(__dirname, 'scripts');
            if (!fs.existsSync(scriptsDir)) {
                fs.mkdirSync(scriptsDir, { recursive: true });
            }
            const scriptFileName = `${uuidv4()}.py`;
            const scriptPath = path.join(scriptsDir, scriptFileName);

            fs.writeFileSync(scriptPath, pythonCode);

            exec(`python ${scriptPath}`, (error, stdout, stderr) => {
                fs.unlinkSync(scriptPath);  // Delete the file after running

                if (error) {
                    console.error("Error executing Python script:", stderr);
                    res.status(500).json({ error: "Failed to execute Python script: " + stderr });
                } else {
                    console.log("Python Script Execution Result:", stdout);
                    res.status(200).json({ response: stdout.trim() });
                }
            });
        } else {
            res.status(200).json({ response: responseContent });
        }
    } catch (error) {
        console.error("Error in fetching AI response:", error);
        res.status(500).json({ error: "Failed to fetch AI response: " + error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });  

module.exports = router;
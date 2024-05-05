document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('aiForm');
  
    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent the form from submitting traditionally
        const prompt = document.getElementById('promptInput').value;
        console.log("Prompt submitted:", prompt);  // Log submitted prompt to confirm value retrieval
  
        try {
            const response = await fetch('/api/query', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ prompt }),
            });
  
            if (!response.ok) {  // Check if response is ok
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            const data = await response.json();
            console.log("Response from server:", data);  // Log data received from the server
  
            document.getElementById('responseOutput').textContent = "AI Response: " + (data.response || "No data received");
        } catch (error) {
            console.error("Error in fetch operation:", error.message);
            document.getElementById('responseOutput').textContent = "Error: " + error.message;
        }
    });
  });
  document.getElementById('responseOutput').textContent = "AI Response: " + (data.response || "No data received");

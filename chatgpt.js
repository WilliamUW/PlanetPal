function getResponseFromChatGPT(message) {
    console.log("hhhhhh")
    const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
    const body = {
      prompt: message,
      max_tokens: 60,
      n: 1,
      stop: "\n"
    };
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    };
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("ChatGPT API request failed.");
      }
    }).then(data => {
      return data.choices[0].text.trim();
    }).catch(error => {
      console.error(error);
    });
  }
  
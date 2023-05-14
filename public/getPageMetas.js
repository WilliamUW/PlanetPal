async function run() {

    const API_KEY = 'ADD YOUR OWN API KEY';
    const MODEL = "text-davinci-002"; //or text-davinci-003


    console.log("getPageMetas - begin")


    // // Product description
    const productDescription = document.querySelector('#productDescription')?.innerText.trim();
    console.log("Product Description: ", productDescription);


    // array with relevant details for evaluation
    const result = []; // Declare and initialize result variable here

    // Product Details (lower table)
    const productDetails = document.querySelector('#productDetails_techSpec_section_1');
    console.log("table: ", productDetails);
    if (productDetails) {
        const rows = productDetails.querySelectorAll('tbody tr');

        // Define the keys we are interested in
        const keysOfInterest = ['Brand', 'Special features', 'Display Technology', 'Display type', 'Refresh rate', 'Finish Types', 'Import', 'Imported', 'Power Source', 'Material', 'Materials', 'Material Type'];

        for (const row of rows) {
            const cells = row.querySelectorAll('td');
            for (let i = 0; i < cells.length; i++) {
                const cellText = cells[i].previousElementSibling.textContent.trim();
                // Check if the cellText is in our keysOfInterest
                if (keysOfInterest.includes(cellText)) {
                    const cellValue = cells[i].textContent.trim();
                    console.log(`${cellText}:`, cellValue);
                    result.push(`${cellText}: ${cellValue}`);
                    break;  // No need to continue this loop if we found a match
                }
            }
        }
        console.log(result);

    } else {
        console.log('Table not found on this page');
    }

    let PriceWhole = document.querySelectorAll(".a-price-whole")[0].innerText
    PriceWhole = parseInt(PriceWhole.replace("\n", "").replace(".", ""))


    let PriceFrac = document.querySelectorAll(".a-price-fraction")[0].innerText
    PriceFrac = parseInt(PriceFrac.replace("\n", "").replace(".", ""))

    const PriceTotal = parseFloat(`${PriceWhole}.${PriceFrac}`)

    const metas = document.getElementsByTagName('meta');
    const metaArr = [];
    for (var i = 0; i < metas.length; i++) {
        const name = metas[i].getAttribute("name");
        const property = metas[i].getAttribute("property");
        const httpequiv = metas[i].getAttribute("http-equiv");
        const content = metas[i].getAttribute("content");
        const charset = metas[i].getAttribute("charset");
        metaArr.push([name, property, httpequiv, content, charset]);
    }


    console.log("got metas")
    console.log("metaArr information: ", metaArr)

    // get product title, description, manufacturer from metaArr
    let title = "";
    let ingredients = "";
    let packaging = "";

    for (let i = 0; i < metaArr.length; i++) {
        if (metaArr[i][0] === "title") {
            title = metaArr[i][3];
        } else if (metaArr[i][0] === "description") {
            ingredients = metaArr[i][3].toLowerCase();
        }
    }



    console.log("checkpoint 1")

    const score_prompt = `
    Provide one eco friendly score from 0 to 100, 
    based on metrics and criteria such as environmental impact, social responsibility, and economic viability,
    one score that takes product and company into account:
    title: "${title}", 
    ingredients: "${ingredients}", 
    product description: "${productDescription}",
    additional details: "${result}". Return one number from 0 to 100 only:`

    console.log("score_prompt", score_prompt)

    const product_explanation_prompt = `
    Give a one paragraph explanation regarding the pros and one paragraph explanation regarding the cons of the product's sustainability. Focus on the product's sustainability,
    consider environmental impact, social responsibility, packaging, end of life, and raw materials.
    title: "${title}", 
    ingredients: "${ingredients}", 
    product description: "${productDescription}",
    additional details: "${result}". `

    console.log("product_explanation_prompt", product_explanation_prompt)

    const alternative_prompt = `
    Find 3 alternative sustainable products on amazon that are similar to this one. 
    Provide the names of the 3 relevant product names with:
    title: "${title}", 
    ingredients: "${ingredients}", 
    product description: "${productDescription}",
    additional details: "${result}". `

    console.log("alternative_prompt", alternative_prompt)

    // 3 chatgpt api calls
    // 1. for score
    // 2. for explanation of score
    // 3. for alternatives


    // make api call to chatGPT


    /**
     * 
     * @param {string} score_prompt 
     * @param {string} product_explanation_prompt 
     * @param {string} alternative_prompt 
     */
    async function getResult(score_prompt, product_explanation_prompt, alternative_prompt) {
        const url = `https://api.openai.com/v1/engines/${MODEL}/completions`;
        const body = {
            prompt: [score_prompt, product_explanation_prompt, alternative_prompt],
            max_tokens: 600,
            n: 1,
            stop: ""
        };
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: headers
            });

            if (!response.ok) {
                throw new Error("ChatGPT API request failed.");
            }

            const data = await response.json();

            console.log(data.choices);
            chrome.runtime.sendMessage({
                method: "getMetas",
                price: PriceWhole,
                metas: metaArr,
                score: data.choices[0].text.trim(),
                product_explanation: data.choices[1].text.trim(),
                alternatives: data.choices[2].text.trim()
            });
        } catch (error) {
            console.error(error);
        } finally {
            console.log("getPageMetas - end");
        }
    }


    getResult(score_prompt, product_explanation_prompt, alternative_prompt);


}

run();
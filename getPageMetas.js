const API_KEY = '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';

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

    for (const row of rows) {
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length; i++) {
            const cellText = cells[i].previousElementSibling.textContent.trim();
            if (cellText === 'Brand') {
                const cellValue = cells[i].textContent.trim();
                console.log('Brand:', cellValue);
                brand = cellValue;
                result.push(`Brand: ${cellValue}`)
                break;
            }
            /*if (cellText === 'Manufacturer') {
                const cellValue = cells[i].textContent.trim();
                console.log('Manufacturer:', cellValue);
                result.push(`Manufacturer: ${cellValue}`)
                break;
            }*/
            if (cellText === 'Special features') {
                const cellValue = cells[i].textContent.trim();
                console.log('Special features:', cellValue);
                result.push(`Special features: ${cellValue}`)
                break;
            }
            if (cellText === 'Display Technology') {
                const cellValue = cells[i].textContent.trim();
                console.log('Display Technology:', cellValue);
                result.push(`Display Technology: ${cellValue}`)
                break;
            }
            if (cellText === 'Display type') {
                const cellValue = cells[i].textContent.trim();
                console.log('Display type:', cellValue);
                result.push(`Display type: ${cellValue}`)
                break;
            }
            if (cellText === 'Refresh rate') {
                const cellValue = cells[i].textContent.trim();
                console.log('Refresh rate:', cellValue);
                result.push(`Refresh rate: ${cellValue}`)
                break;
            }
            if (cellText === 'Finish Types') {
                const cellValue = cells[i].textContent.trim();
                console.log('Finish Types:', cellValue);
                result.push(`Finish Types: ${cellValue}`)
                break;
            }
            if (cellText === 'Import') {
                const cellValue = cells[i].textContent.trim();
                console.log('Import:', cellValue);
                result.push(`Import: ${cellValue}`)
                break;
            }
            if (cellText === 'Imported') {
                const cellValue = cells[i].textContent.trim();
                console.log('Imported:', cellValue);
                result.push(`Imported: ${cellValue}`)
                break;
            }
            if (cellText === 'Power Source') {
                const cellValue = cells[i].textContent.trim();
                console.log('Power Source:', cellValue);
                result.push(`Display type: ${cellValue}`)
                break;
            }
            if (cellText === 'Material') {
                const cellValue = cells[i].textContent.trim();
                console.log('Material:', cellValue);
                result.push(`Material: ${cellValue}`)
                break;
            }
            if (cellText === 'Materials') {
                const cellValue = cells[i].textContent.trim();
                console.log('Materials:', cellValue);
                result.push(`Materials: ${cellValue}`)
                break;
            }
            if (cellText === 'Material Type') {
                const cellValue = cells[i].textContent.trim();
                console.log('Material Type:', cellValue);
                result.push(`Material Type: ${cellValue}`)
                break;
            }
        }
    }
    console.log(result);

} else {
    console.log('Table not found on this page');
}

var metas = document.getElementsByTagName('meta'); 
var metaArr = [];
for (var i=0; i<metas.length; i++) { 
    var name = metas[i].getAttribute("name");
    var property = metas[i].getAttribute("property");
    var httpequiv = metas[i].getAttribute("http-equiv");
    var content = metas[i].getAttribute("content");
    var charset = metas[i].getAttribute("charset");
    metaArr.push([name, property, httpequiv, content, charset]);
} 



console.log("got metas")
console.log("metaArr information: ", metaArr)

// get product title, description, manufacturer from metaArr
var title = "";
var ingredients = "";
var packaging = "";

for (var i=0; i<metaArr.length; i++) {
    if (metaArr[i][0] === "title") {
        title = metaArr[i][3];
    } else if (metaArr[i][0] === "description") {
        var desc = metaArr[i][3].toLowerCase();
        ingredients = desc;
        // if (desc.includes("ingredients")) {
        //     ingredients = desc.split("ingredients: ")[1];
        // } else if (desc.includes("packaging")) {
        //     packaging = desc.split("packaging: ")[1];
        // }
    }
}

console.log("title", title)
console.log("ingredients", ingredients)
console.log("packaging", packaging)
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
packaging type: "${packaging}",
product description: "${productDescription}",
additional details: "${result}". `

console.log("product_explanation_prompt", product_explanation_prompt)

/*const company_explanation_prompt = `
Talk about the company's sustainability. Focus on the company, 
consider company's reputation and manufacturing process.
Company: "${brandName}",
Manufacturer: "${manufacturerName}.`

console.log("company_explanation_prompt", company_explanation_prompt)*/

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

// to do: display the chatgpt result on the extension

// make api call to chatGPT
const url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
const body = {
    prompt: [score_prompt, product_explanation_prompt, /*company_explanation_prompt,*/ alternative_prompt],
    max_tokens: 600,
    n: 1,
    stop: ""
};
const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + API_KEY
};

fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers
}).then(response => {
    console.log("11111111")
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("ChatGPT API request failed.");
    }
}).then(data => {
    console.log(data.choices);
    chrome.runtime.sendMessage({
        method:"getMetas",
        metas:metaArr,
        score:data.choices[0].text.trim(),
        product_explanation:data.choices[1].text.trim(),
/*
        company_explanation:data.choices[2].text.trim(),
*/
        alternatives:data.choices[2].text.trim()
    });
}).catch(error => {
    console.error(error);
}).finally(() => {
    console.log("getPageMetas - end");
});


const fetchApiTools = async() =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    showTools(data.data.tools)
}

const showTools = (data) =>{
    console.log(data);
    const toolsContainer = document.getElementById('tools-container');
    data.forEach(tool => {
        console.log(tool);
        toolsContainer.innerHTML += `
        <div class="card card-compact w-full bg-base-100 border border-slate-100 shadow-xl">
            <figure class="p-4 h-72"><img class="rounded-xl h-full" src="${tool.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <p>1. ${tool.features[0] ? tool.features[0] : 'Not available'}</p>
                <p>2. ${tool.features[1] ? tool.features[1] : 'Not available'}</p>
                <p>3. ${tool.features[2] ? tool.features[2] : 'Not available'}</p>
                <hr class="my-4"/>
                <h2 class="text-xl font-bold">${tool.name}</h2>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `
    })
}
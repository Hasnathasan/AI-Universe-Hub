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
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold mb-2">${tool.name}</h2>
                        <div class="flex gap-3 justify-center items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p>${tool.published_in}</p>
                        </div>
                    </div>
                    <label for="my-modal-5" onclick="toolDetails('${tool.id}')" class="btn bg-misty-100 text-misty rounded-3xl w-11 h-11 border-0 p-1"><i class="fa-solid fa-arrow-right"></i></label>
                    
                </div>
                
            </div>
        </div>
        `
    })
}





const toolDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showDetailsInModal(data.data));
}

const showDetailsInModal = data => {
    console.log(data)
    document.getElementById('modalTitle').innerText = `${data.description}`;
    document.getElementById('pricing1').innerText = `${data.pricing[0].price ? data.pricing[0].price : 'Free of Cost'} ${data.pricing[0].plan}`;
    document.getElementById('pricing2').innerText = `${data.pricing[1].price ? data.pricing[1].price : 'Free of Cost'} ${data.pricing[1].plan}`;
    document.getElementById('pricing3').innerText = `${data.pricing[2].price ? data.pricing[2].price : 'Free of Cost'} ${data.pricing[2].plan}`;
    document.getElementById('fearure1').innerText = `. ${data.features[1].feature_name}`;
    document.getElementById('fearure2').innerText = `. ${data.features[2].feature_name}`;
    document.getElementById('fearure3').innerText = `. ${data.features[3].feature_name}`;
    document.getElementById('in1').innerText = `. ${data.integrations[0]}`;
    document.getElementById('in2').innerText = `. ${data.integrations[1]}`;
    document.getElementById('in3').innerText = `. ${data.integrations[2]}`;
    document.getElementById('modal-img').setAttribute('src', `${data.image_link[0]}`);
    document.getElementById('modal-input-example').innerText = `${data.input_output_examples[0].input}`;
    document.getElementById('modal-output-example').innerText = `${data.input_output_examples[0].output}`;
}
const fetchApiTools = async (slice) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    showTools(data.data.tools, slice);
}

const showTools = (data, slice) => {

    const seeMoreBtn = document.getElementById('see-more');
    if (slice && data.length > 6) {
        data = data.slice(0, 6);
        seeMoreBtn.classList.remove('hidden');
    }
    else {
        seeMoreBtn.classList.add('hidden');
    };
    setValueOfData(data);
    document.getElementById('short-date').addEventListener('click', function () {
        sortByDate(data);
    });
}


const setValueOfData = (data) => {
    const toolsContainer = document.getElementById('tools-container');
    toolsContainer.innerHTML = '';
    data.forEach(tool => {
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
                    <label for="my-modal-5" onclick="toolDetails('${tool.id}')" class="btn bg-misty100 text-misty rounded-3xl w-11 h-11 border-0 p-1"><i class="fa-solid fa-arrow-right"></i></label>
                    
                </div>
                
            </div>
        </div>
        `;
    });
    loding(false);
}

const sortByDate = (data) => {
    data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    setValueOfData(data);
}




const toolDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetailsInModal(data.data))
}
const showDetailsInModal = data => {
    document.getElementById('modalTitle').innerText = `${data.description}`;
    document.getElementById('pricing1').innerText = `${data.pricing ? data.pricing[0].price : 'Free of Cost/ Basic'} ${data.pricing ? data.pricing[0].plan : ''}`;
    document.getElementById('pricing2').innerText = `${data.pricing ? data.pricing[1].price : 'Free of Cost/ Pro'} ${data.pricing ? data.pricing[1].plan : ''}`;
    document.getElementById('pricing3').innerText = `${data.pricing ? data.pricing[2].price : 'Free of Cost/ Enterprice'} ${data.pricing ? data.pricing[2].plan : ''}`;


    const features = data.features;
    const featureContainer = document.getElementById('feature-container');
    featureContainer.innerHTML = '';
    for (const order in features) {
        featureContainer.innerHTML += `
            <li class="mb-2 list-disc">${features[order].feature_name}</li>
        `;
    }


    const integrations = data.integrations;
    const integrationsContainer = document.getElementById('integrations-container');
    integrationsContainer.innerHTML = '';
    if (Array.isArray(integrations) === true) {
        for (const integration of integrations) {
            integrationsContainer.innerHTML += `
                    <li class="mb-2 list-disc">${integration}</li>
                `;
        }
    }
    else {
        integrationsContainer.innerHTML = `
            <li>No Data Found</li>
        `;
    }

    document.getElementById('modal-img').setAttribute('src', `${data.image_link[0]}`);
    document.getElementById('modal-input-example').innerText = `${data.input_output_examples ? data.input_output_examples[0].input : 'Can you give any Example'}`;
    document.getElementById('modal-output-example').innerText = `${data.input_output_examples ? data.input_output_examples[0].output : 'No! Not yot! Take a break!!!'}`;
    const score = document.getElementById('score');
    if (typeof data.accuracy.score === 'number') {
        score.classList.remove('hidden');
        score.innerText = `${data.accuracy.score * 100}% accuracy`;
    }
    else {
        score.classList.add('hidden');
    }
}
const loding = (isLoding) => {
    const loder = document.getElementById('progress');
    if (isLoding) {
        loder.classList.remove('hidden');
    }
    else {
        loder.classList.add('hidden');
    }
}
loding(true);
const seeMore = () => {
    fetchApiTools();
}
let CurrentSeries = 1
let html = `<div class="mb-3"><h2>Series 1</h2></div>
            <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">`

jsonData.forEach(asset => {
    const { Card, Contract, ['Creation Date']: CreationDate, Description, IPFS, ['IPFS hash']: IPFSHash, Image, Locked, Name, Series, Supply, Symbol, Type, Burned } = asset

    if(CurrentSeries !== Series) {
        html += `</div>
        <div class="mb-3"><h2>Series ${Series}</h2></div>
        <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">`
        
        CurrentSeries = Series
    }

    html += `<div class="col mb-5">
        <div class="card h-100">

            ${IPFS ? `<img class="card-img-top" src="assets/ipfs/${Name}.${Type}" alt="${Name}" />` : 
            Image ? `<img class="card-img-top" src="assets/artwork/${Name}.${Type}" alt="${Name}" />` : 
            '<img class="card-img-top" src="https://dummyimage.com/400x560/dee2e6/6c757d&text=No image" alt="No image" />' }
            
            <div class="card-body bg-gray p-4" style="position: relative;">
                <div class="position-absolute text-success" style="font-size: 24px; top: 0.5rem; right: 0.5rem;">
                    ${IPFS ? `<i class="bi bi-cloud-check-fill" title="This card has an image which corresponds to the on-chain IPFS hash"></i>` : '' /* ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">IPFS</div>` : '' */ }
                    ${Locked ? `<i class="bi bi-file-lock-fill" title="This card has a locked supply, no more can be minted"></i>` : '' }
                </div>

                <div class="text-center">
                    <h5 class="fw-bolder">S${Series}C${Card}<br />${Name}</h5>
                    supply: ${Supply}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-gray">
                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="https://etherscan.io/token/${Contract}">View on etherscan</a></div>
            </div>
        </div>
    </div>`
})

html += '</div>'

document.querySelector('#cards .container').innerHTML = html
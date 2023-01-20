let CurrentSeries = 1
let html = `<div class="mb-3"><h2>Series 1</h2></div>
            <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">`
let tableHtml = `<div class="table-responsive"><table class="table table-striped"><thead><tr>
                    <th>Series</th>
                    <th>Card</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Decimals</th>
                    <th>CreationDate</th>
                    <th>Supply</th>
                    <th>Contract</th>
                </tr></thead><tbody>`

jsonData.forEach(asset => {
    const { Card, Contract, ['Creation Date']: CreationDate, Description, IPFS, ['IPFS hash']: IPFSHash, Image, Locked, Name, Series, Supply, Symbol, Type, Burned, Decimals } = asset

    if(CurrentSeries !== Series) {
        html += `</div>
        <div class="mb-3"><h2>${Series === 'Fake Peperium' ? Series : `Series ${Series}`}</h2></div>
        <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">`
        
        CurrentSeries = Series
    }

    html += `
    <div class="col mb-5">
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
                    <h5 class="fw-bolder">${Series === 'Fake Peperium' ? Series : `S${Series}C${Card}`}<br />${Name}</h5>
                    supply: ${Supply}
                    ${Decimals > 0 ? `<br />decimals: ${Decimals}` : ''}
                    ${Series === 'Fake Peperium' ? `<br /><div title="${`${Name} image dates back to 2017, but was uploaded to IPFS in 2023`}" class="bg-primary text-white pt-1 pb-2 mt-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                  </svg> IPFS uploaded in 2023</div>` : ''}
                </div>
            </div>
            <div class="card-footer p-4 pt-0 border-top-0 bg-gray">
                <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modal${Name}">
                        Show more info
                    </button>

                    <!--<a class="btn btn-outline-dark mt-auto" href="https://etherscan.io/token/${Contract}">View on etherscan</a>-->
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal${Name}" tabindex="-1" aria-labelledby="modal${Name}" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="gridModalLabel">${Series === 'Fake Peperium' ? Series : `S${Series}C${Card}`} - ${Name}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    
                    <div class="modal-body">
                        <div>
                            <div class="row">
                                <div class="col-md-4">
                                    Name
                                </div>
                                
                                <div class="col-md-8">
                                    ${Name}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Symbol
                                </div>
                                
                                <div class="col-md-8">
                                    ${Symbol}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Decimals
                                </div>
                                
                                <div class="col-md-8">
                                    ${Decimals > 0 ? `<span class="text-warning"><i class="bi bi-exclamation-triangle-fill"></i></span> This card is divisible, so make sure to work with <strong>${Decimals} decimals</strong> when buying/wrapping/sending etc` : Decimals} 
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Description
                                </div>
                                
                                <div class="col-md-8">
                                    ${Description}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Creation Date
                                </div>
                                
                                <div class="col-md-8">
                                    ${CreationDate}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    IPFS Hash
                                </div>
                                
                                <div class="col-md-8">
                                    ${Series === 'Fake Peperium' ? `${Name} image dates back to 2017, but was uploaded to IPFS in 2023<br />` : IPFS ? '' : `<span class="text-warning"><i class="bi bi-exclamation-triangle-fill"></i></span> Unfortunately this IPFS hash isn't online anymore, but this is the on-chain hash<br />`}
                                    <i class="bi bi-caret-right-square-fill"></i> <a class="link-dark" href="https://ipfs.io/ipfs/${IPFSHash}" target="_blank">${IPFSHash}</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Contract address
                                </div>

                                <div class="col-md-8">
                                    <i class="bi bi-caret-right-square-fill"></i> <a class="link-dark" href="https://etherscan.io/address/${Contract}" target="_blank">${Contract}</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    Locked
                                </div>

                                <div class="col-md-8">
                                    ${Locked ? 'Yes, this supply is finite!!!' : `<span class="text-warning"><i class="bi bi-exclamation-triangle-fill"></i></span> No, this asset isn't locked, so it's possible the owner of thist contract can increase the supply<br />`}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    tableHtml += `<tr>
        <td style="white-space: nowrap;">${Series}</td>
        <td>${Card}</td>
        <td>${Name}</td>
        <td>${Symbol.length > 7 ? `<span title="${Symbol}">${Symbol.substring(0, 7)}..</span>` : Symbol}</td>
        <td>${Decimals}</td>
        <td style="white-space: nowrap;">${CreationDate.replace(/ /g, '&nbsp;')}</td>
        <td>${Supply}</td>
        <td><a target="_blank" href="https://etherscan.io/address/${Contract}">${Contract}</a></td>
    </tr>`
})

html += '</div>'
tableHtml += `</tbody></table></div>`

document.querySelector('#cards .container').innerHTML = html
document.querySelector('#technical #table-container').innerHTML = tableHtml

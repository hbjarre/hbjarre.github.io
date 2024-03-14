const http_url = "https://be.dev.pvpc.io/swBFH8dDShAjJLGRt8gnNx";

async function info(){
    const response = await (await fetch(`${http_url}/info`, {method: "GET"})).json();
    updateScores(response);
}

async function vote(){
    const targetIds = ["skate", "merch", "lolo", "pets"];
    const values = {}; 
    for (const e of targetIds) {
        values[e] = getInputValue(e);
    }
    await fetch(`${http_url}/vote`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    });
    info();
}

function getInputValue(id) {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLInputElement)) {
        throw new Error(`expected element with id '${id}' to be an HTMLInputElement`);
    }
    return element.value;
}

function updateScores(v) {
    document.getElementById("skate_score").innerText = (v['skate'] / v['count']).toFixed(1);
    document.getElementById("merch_score").innerText = (v['merch'] / v['count']).toFixed(1);
    document.getElementById("lolo_score").innerText = (v['lolo'] / v['count']).toFixed(1);
    document.getElementById("pets_score").innerText = (v['pets'] / v['count']).toFixed(1);
    document.getElementById("count_score").innerText = v['count'];
}

info();

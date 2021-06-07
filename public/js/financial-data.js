const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const currencyInput = document.getElementById("currency");

let start;
let end;
let currency = currencyInput.value;



const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

startInput.onChange = (event) => {
    start = event.target.value;
    getHistorialData();
};

endInput.addEventListener("change", (event) => {
    end = event.target.value;
    getHistorialData();
});

currencyInput.onChange = (event) => {
    curency = event.target.value;
    bitcoinPriceTracker();
};


                //Function to get the date from the API
//Object.keys() returns an array whose elements are strings corresponding to the enumerable properties found directly upon object
//Object.values() returns an array whose elements are the enumerable property values found on the object. The ordering of the properties is the same as that given by looping over the property values of the object manually.

function getHistorialData() {
    if (!end || !start) {
        return;
    }
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate < startDate) {
        return `Something went wrong`
    }

    axios
    .get(`${baseUrl}?start=${start}&end==${end}&currency=${currency}`)
    .then((axiosResponse2) => {
        const labels = Object.keys(axiosResponse2.data.bpi);
        const data = Object.values(axiosResponse2.data.bpi);
        drawChart(labels, data);
    });
}

//Function to track the values of the bitcoin from the API

function bitcoinPriceTracker() {
    axios
    .get(`${baseUrl}?currency=${currency}`)
    .then((axiosResponse) => {
        console.log("axiosResponse:", axiosResponse.data);
        const labels = Object.keys(axiosResponse.data.bpi);
        const data = Object.values(axiosResponse.data.bpi);
        drawChart(labels, data);
    });
}

//Function to draw the graphic - comes from the chartjs API

function drawChart(lables, data) {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new CharacterData(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [
                {
                    label: "# of Votes",
                    data,
                },
            ],
        },
    });
}

bitcoinPriceTracker();